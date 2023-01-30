<<<<<<< HEAD
const { Schema, model } = require("mongoose");

const pokeSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    base: {
      type: String,
      required: true,
    },
    shiny: {
      type: Boolean,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Poke = model("Poke", pokeSchema);

module.exports = Poke;
=======
const mongoose = require('mongoose');

const { Schema } = mongoose;

const pokeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Poke = mongoose.model('Poke', pokeSchema);

module.exports = Poke;
>>>>>>> 7d34624628112c24b0970b4a55e9115b5d54b50f
