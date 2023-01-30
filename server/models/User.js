const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');
const pokeSchema = require("./Poke");
<<<<<<< HEAD

const userSchema = new Schema(
  {
=======
const userSchema = new Schema({
>>>>>>> 7d34624628112c24b0970b4a55e9115b5d54b50f
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
<<<<<<< HEAD
  currentPoke: [
    {
      type: Schema.Types.ObjectId,
      ref: "Poke",
    },
  ],
},
{
  toJSON: {
    virtuals: true,
  },
}
);
=======
  orders: [Order.schema],
  currentPoke: [
      {
        type: Schema.Types.ObjectId,
        ref: "Poke",
      },
    ],
});
>>>>>>> 7d34624628112c24b0970b4a55e9115b5d54b50f

userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
