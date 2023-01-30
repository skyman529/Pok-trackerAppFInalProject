const mongoose = require('mongoose');

const { Schema } = mongoose;

const shinySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Shiny = mongoose.model('Shiny', shinySchema);

module.exports = Shiny;
