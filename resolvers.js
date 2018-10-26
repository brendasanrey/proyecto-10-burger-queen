const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (user, secret, expiresIn) => {
  const { username, password } = user;
  return jwt.sign({ username, password }, secret, { expiresIn });
};

module.exports = {
  Query: {
    getUser: () => null,
    getCurrentUser: async (_, args, { User }) => {},
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
    getSideList: async (_, args, { Side }) => {
      const sides = await Side.find({}).sort({ name: "desc" });
      return sides;
    },
    getOrderList: async (_, args, { Order }) => {
      const orders = await Order.find({}).sort({ client: "desc" });
      return orders;
    }
  },
  Mutation: {
    signupUser: async (_, { username, password }, { User }) => {
      // Verifica si ya existe un usuario con ese nombre
      const user = await User.findOne({
        username
      });
      if (user) {
        throw new Error("El usuario proporcionado ya existe");
      }
      // Crea un nuevo usuario y le pasa los valores de los argumentos recibidos
      const newUser = await new User({
        username,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    },
    signinUser: async (_, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      // Comparar la contraseña ingresada con la almacenada en la base
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Contraseña incorrecta");
      }
      return { token: createToken(user, process.env.SECRET, "1hr") };
    },
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
    addSide: async (_, { name, price }, { Side }) => {
      const side = await Side.findOne({ name });
      if (side) {
        throw new Error("Side already exists");
      }
      const newSide = await new Side({ name, price }).save();
      return newSide;
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
    addOrder: async (
      _,
      { food, drink, extra, side, total, client },
      { Order }
    ) => {
      const newOrder = await new Order({
        food,
        drink,
        extra,
        side,
        total,
        client
      }).save();
      return newOrder;
    }
  }
};
