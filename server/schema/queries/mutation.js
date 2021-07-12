
const graphql = require('graphql');
const axios = require('axios');

const { UserType } = require('../types');

const {
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType
} = graphql;


const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                fullName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, { fullName, age }) {
                return axios.post('http://localhost:3000/users', { fullName, age }).then(res => res.data);
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { id }) {
                return axios.delete(`http://localhost:3000/users/${id}`, { id }).then(res => res.data);
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                fullName: { type: GraphQLString },
                age: { type: GraphQLInt },
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, { id, fullName, age, companyId }) {
                return axios.put(`http://localhost:3000/users/${id}`, { id, fullName, age, companyId }).then(res => res.data);
            }
        }
    }
});

module.exports = mutation;