const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });
const fs = require("fs");
const path = require("path");

const Drink = require("./models/Drink");
const Food = require("./models/Food");
const Extra = require("./models/Extra");
const Side = require("./models/Side");
const Order = require("./models/Order");
const User = require("./models/User");
const resolvers = require("./resolvers");

const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Base de datos conectada"))
  .catch(error => console.log(error));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    Drink,
    Food,
    Extra,
    Side,
    User,
    Order
  }
});
// {port: process.env.PORT || 4000}
server.listen(4000).then(({ url }) => {
  console.log("Servidor activo ", url);
});
