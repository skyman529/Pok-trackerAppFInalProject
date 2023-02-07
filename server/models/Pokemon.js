const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const pokemonSchema = new Schema({
  number: {
    type: Number,
  },
  name: {
    type: String,
  },
  pokeType: {
    type: Array,
  },
  image: {
    type: String,
  },
  shiny: {
    type: Boolean,
  },
},
);

const Pokemon = model('Pokemon', pokemonSchema);

module.exports = Pokemon;
