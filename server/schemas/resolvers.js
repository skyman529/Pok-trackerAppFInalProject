const { AuthenticationError } = require('apollo-server-express');
const { User, Pokemon } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('pokemons');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('pokemons');
    },
    pokemons: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Pokemon.find(params).sort({ createdAt: -1 });
    },
    pokemon: async (parent, { pokemonId }) => {
      return Pokemon.findOne({ _id: pokemonId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('pokemons');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addPokemon: async (parent, { type }, context) => {
      if (context.user) {
        const pokemon = await Pokemon.create({
          shiny,
          thoughtAuthor: /*HOW DO WE CHANGE THIS?*/ context.user.username, 
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pokemons: pokemon._id } }
        );

        return pokemon;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { pokemonId, commentText }, context) => {
      if (context.user) {
        return Pokemon.findOneAndUpdate(
          { _id: pokemonId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removePokemon: async (parent, { pokemonId }, context) => {
      if (context.user) {
        const pokemon = await Pokemon.findOneAndDelete({
          _id: pokemonId,
          name: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { pokemons: pokemon._id } }
        );

        return pokemon;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { pokemonId, commentId }, context) => {
      if (context.user) {
        return Pokemon.findOneAndUpdate(
          { _id: pokemonId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
