const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  food: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "Food"
  },
  extra: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "Extra"
  },
  side: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "Side"
  },
  drink: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "Drink"
  },
  total: {
    type: Number,
    required: true
  },
  client: {
    type: String,
    required: true
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

module.exports = mongoose.model("Order", OrderSchema);
