const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const pokemondataSchema = new Schema({
  number: {
    type: Number
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
});

const PokemonData = model('PokemonData', pokemondataSchema);

module.exports = PokemonData;
