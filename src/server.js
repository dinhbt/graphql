import 'dotenv/config';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import http from 'http';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import DataLoader from 'dataloader';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';

import { connect } from './config/database';
import schema from './schema';
import models from './models';
import resolvers from './resolvers';
import loaders from './loaders';

const app = express();
app.use(cors());
const port = process.env.PORT || 8000;

const validateToken = (req) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      return jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  formatError: (error) => {
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      message,
      code: error.extensions.code,
    };
  },
  context: async ({ req, connection, res }) => {
    if (connection) {
      return {
        models,
        loaders: {
          user: new DataLoader((keys) => loaders.user.batchUsers(keys, models)),
        },
      };
    }

    if (req) {
      const profile = await validateToken(req);
      return {
        models,
        profile,
        secret: process.env.SECRET,
        loaders: {
          user: new DataLoader((keys) => loaders.user.batchUsers(keys, models)),
        },
      };
    }
  },
});

const startup = async () => {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
};

startup();

const httpServer = http.createServer(app);

if (process.env.MONGO_URL) {
  connect().then(() => {
    httpServer.listen({ port }, () => {
      console.log(`Apollo Server on http://localhost:${port}/graphql`);
    });
  });
}
