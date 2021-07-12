const express = require('express');
const expressGraphQL = require('express-graphql');

const schema = require('./schema');

const app = express();


app.use('/graphql', expressGraphQL.graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(4001, () => {
    console.log('Listening Port: 4001');
});