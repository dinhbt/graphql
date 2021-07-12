const graphql = require('graphql');
const axios = require('axios');

const { CompanyType } = require('../types');


const { GraphQLString, } = graphql;

const companies = {
    type: CompanyType,
    args: { id: { type: GraphQLString } },
    resolve(_, args) {
        return axios.get(`http://localhost:3000/companies/${args.id}`).then(res => res.data);
    }
}

module.exports = { companies, };