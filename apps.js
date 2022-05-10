const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginInlineTraceDisabled } = require('apollo-server-core');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { readFileSync } = require('fs');

const port = process.env.APOLLO_PORT || 4000;

const apps = [
    { id: 'c015bb98-9801-11ea-b235-db7d9bc5e760', name: 'Chief Data Office', logo: 'https://atlas.att.com/cdo/cdo.png', baseUrl: "https://atlas.att.com/cdo/" },
    { id: '74e3e04a-bb9f-11e8-b624-fa163e4c5490', name: 'Stories', logo: 'https://atlas.att.com/stories/stories.png', baseUrl: "https://atlas.att.com/stories/" },
]

const typeDefs = gql(readFileSync('./apps.graphql', { encoding: 'utf-8' }));
const resolvers = {
    Query: {
        getAtlasApps: (_, args, context) => {
            return apps;
        },
        atlasApp: (_, args, context) => {
            return apps.find(p => p.id === args.id);
        }
    },
}
const server = new ApolloServer({ schema: buildSubgraphSchema({ typeDefs, resolvers }), plugins: [ApolloServerPluginInlineTraceDisabled()], });
server.listen( {port: port} ).then(({ url }) => {
  console.log(`🚀 Apps subgraph ready at ${url}`);
}).catch(err => {console.error(err)});
