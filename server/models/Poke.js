const { Schema, model } = require("mongoose");

const pokeSchema = new Schema(
  {
    id: {
      type: Number,
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
