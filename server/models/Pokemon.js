const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const pokemonSchema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,

  },
  image: {
    type: String,
  },
  shiny: {
    type: Boolean,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Pokemon = model('Pokemon', pokemonSchema);

module.exports = Pokemon;
