const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const pokemonSchema = new Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  image: {
    type: String,
  },
  shiny: {
    type: Boolean,
  },
},
{
  typeKey: "$type"
});

const Pokemon = model('Pokemon', pokemonSchema);

module.exports = Pokemon;
