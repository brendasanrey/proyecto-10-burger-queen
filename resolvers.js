const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (user, secret, expiresIn) => {
  const { username, password } = user;
  return jwt.sign({ username, password }, secret, { expiresIn });
};

module.exports = {
  Query: {
    getDrinkList: async (_, args, { Drink }) => {
      const drinks = await Drink.find({}).sort({ name: "desc" });
      return drinks;
    },
    getFoodList: async (_, args, { Food }) => {
      const foodies = await Food.find({}).sort({ name: "desc" });
      return foodies;
    },
    getExtraList: async (_, args, { Extra }) => {
      const extras = await Extra.find({}).sort({ name: "desc" });
      return extras;
    },
    getOrderList: async (_, args, { Order }) => {
      const orders = await Order.find({}).sort({ client: "desc" });
      return orders;
    }
  },
  Mutation: {
    addDrink: async (_, { name, price, imageURL }, { Drink }) => {
      const drink = await Drink.findOne({ name });
      if (drink) {
        throw new Error("Drink already exists");
      }
      const newDrink = await new Drink({ name, price, imageURL }).save();
      return newDrink;
    },
    addExtra: async (_, { name, price }, { Extra }) => {
      const extra = await Extra.findOne({ name });
      if (extra) {
        throw new Error("Extra already exists");
      }
      const newExtra = await new Extra({ name, price }).save();
      return newExtra;
    },
    addFood: async (_, { name, price, shift, imageURL }, { Food }) => {
      const food = await Food.findOne({ name });
      if (food) {
        throw new Error("Food already exists");
      }
      const newFood = await new Food({
        name,
        price,
        shift,
        imageURL
      }).save();
      return newFood;
    },
    addOrder: async (_, { food, drink, extra, total, client }, { Order }) => {
      const newOrder = await new Order({
        food,
        drink,
        extra,
        total,
        client
      }).save();
      return newOrder;
    }
  }
};
