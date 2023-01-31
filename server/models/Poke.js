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
    ref: 'Shiny',
    required: true
  }
});

const Poke = mongoose.model('Poke', pokeSchema);

module.exports = Poke;
