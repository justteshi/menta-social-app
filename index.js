const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const { MONGO } = require('./config.js')



const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
})

// Connect to the DB and the server
mongoose.connect(MONGO, {useNewUrlParser:true})
    .then(() => {
        console.log('DB connected')
        return server.listen({port: 3001})
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })
