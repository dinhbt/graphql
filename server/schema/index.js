const graphql = require('graphql');

const UserQueries = require('./queries/user');
const CompanyQueries = require('./queries/company');


const {
    GraphQLSchema,
    GraphQLObjectType
} = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...UserQueries,
        ...CompanyQueries,
    }
});
module.exports = new GraphQLSchema({ query: RootQuery });