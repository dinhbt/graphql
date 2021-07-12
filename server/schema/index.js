const graphql = require('graphql');

const UserQueries = require('./queries/user');
const CompanyQueries = require('./queries/company');
const Mutation = require('./queries/mutation');


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
module.exports = new GraphQLSchema({ 
    query: RootQuery,
    mutation: Mutation
 });