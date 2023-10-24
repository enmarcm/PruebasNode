import PokemonModel from "../../../models/BO/pokemonModel.js";

class views {
  static viewPokemons = async () => {
    try {
      const result = await PokemonModel.executeMethod({
        method: "viewPokemons",
        params: {},
      });
      if (result.error) return { error: result.error };
      return result;
    } catch (error) {
      return { error };
    }
  };

  static viewAttacks = async () => {
    try {
      const result = await PokemonModel.executeMethod({
        method: "viewAttacks",
        params: {},
      });
      if (result.error) return { error: result.error };
      return result;
    } catch (error) {
      return { error };
    }
  };

  static viewTypes = async () => {
    try {
      const result = await PokemonModel.executeMethod({
        method: "viewTypes",
        params: {},
      });
      if (result.error) return { error: result.error };
      return result;
    } catch (error) {
      return { error };
    }
  };

  static viewPokemon = async ({ name }) => {
    try {
      const result = await PokemonModel.executeMethod({
        method: "viewPokemon",
        params: { name },
      });
      if (result.error) return { error: result.error };
      return result;
    } catch (error) {
      return { error };
    }
  };
}

export default views