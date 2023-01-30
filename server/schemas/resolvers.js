const { AuthenticationError } = require('apollo-server-express');
const { User, Poke, Shiny, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    shinies: async () => {
      return await Shiny.find();
    },
    pokes: async (parent, { shiny, name }) => {
      const params = {};

      if (shiny) {
        params.shiny = shiny;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Poke.find(params).populate('shiny');
    },
    poke: async (parent, { _id }) => {
      return await Poke.findById(_id).populate('shiny');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.pokes',
          populate: 'shiny'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.pokes',
          populate: 'shiny'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ pokes: args.pokes });
      const line_items = [];

      const { pokes } = await order.populate('pokes');

      for (let i = 0; i < pokes.length; i++) {
        const poke = await stripe.pokes.create({
          name: pokes[i].name,
          description: pokes[i].description,
          images: [`${url}/images/${pokes[i].image}`]
        });

        const price = await stripe.prices.create({
          poke: poke.id,
          unit_amount: pokes[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { pokes }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ pokes });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updatePoke: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Poke.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
