const axios = require('axios');
const graphql = require('graphql');

const {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType
} = graphql;


const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`).then(res => res.data)
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        fullName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: CompanyType,
            async resolve(parentValue) {
                const res = await axios.get(`http://localhost:3000/companies/${parentValue.companyId}`);
                return res.data;
            }
        }
    })
});

module.exports = { CompanyType, UserType };
