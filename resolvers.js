module.exports = {
  Query: {
    getUser: () => null
  },
  Mutation: {
    signupUser: async (_, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }
      const newUser = await new User({
        username,
        password
      }).save();
      return newUser;
    },
    addDrink: async (_, { name, price }, { Drink }) => {
      // const drink = await Drink.findOne({ name });
      if (drink) {
        throw new Error("Drink already exists");
      }
      const newDrink = await new Drink({ name, price }).save();
      return newDrink;
    },
    addFood: async (_, { name, price, shift, extra, side }, { Food }) => {
      const food = await Food.findOne({ name });
      if (food) {
        throw new Error("Food already exists");
      }
      const newFood = await new Food({
        name
        price,
        shift,
        extra,
        side
      }).save();
      return newFood;
    },
    addOrder: () => {}
  }
};
