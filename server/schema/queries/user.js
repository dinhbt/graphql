
const graphql = require('graphql');
const axios = require('axios');

const { UserType } = require('../types');

const {
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
} = graphql;

const users = {
    type: UserType,
    args: { id: { type: GraphQLString } },
    resolve(_, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`).then(res => res.data);
    }
};

module.exports = { users, };