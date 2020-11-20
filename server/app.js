const express = require('express')
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const cors = require('cors')

const app = express();
app.use(cors())
const mongoose = require("mongoose");



mongoose.connect('mongodb://dev:DEV123!@cluster0-shard-00-00.r2fa9.mongodb.net:27017,cluster0-shard-00-01.r2fa9.mongodb.net:27017,cluster0-shard-00-02.r2fa9.mongodb.net:27017/projects?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
  console.log("connected")

})

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);
app.listen(5000, () => {
  console.log("now listening on port 5000")
})
