const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Base de datos conectada"))
  .catch(error => console.log(error));

const typeDefs = gql`
  type Lista {
    tarea: String
    persona: String
  }

  type Query {
    getLista: [Lista]
  }
`;

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log("Servidor activo ", url);
});
