const { AuthenticationError } = require('apollo-server-express');
const { User, Pokemon, PokemonData } = require('../models');
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
      return Pokemon.find(params);;
    },
    pokemon: async (parent, { pokemonId }) => {
      return Pokemon.findOne({ _id: pokemonId });
    },
    pokemondatas: async (parent) => {
      return PokemonData.find({});
    },
    pokemondata: async (parent, { pokemondataId }) => {
      return Pokemon.findOne({ _id: pokemondataId });
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
    addPokemon: async (parent, { number, pokeName, pokeType, image, shiny }, context) => {
      if (context.user) {
        const pokemon = await Pokemon.create({
          number,
          pokeName,
          pokeType,
          image,
          pokeUser: context.user.username,
          shiny
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pokemons: pokemon._id } }
        );

        return pokemon;
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
  },
};

module.exports = resolvers;
