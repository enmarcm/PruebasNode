import PokemonModel from "../../../models/BO/pokemonModel.js";

class removes {
  static removePokemon = async ({ name }) => {
    try {
      const result = await PokemonModel.executeMethod({
        method: "removePokemon",
        params: { name },
      });
      if (result.error) return { error: result.error };
      return result;
    } catch (error) {
      return { error };
    }
  };

  static removeAttack = async ({ attack }) => {
    try {
      const result = await PokemonModel.executeMethod({
        method: "removeAttack",
        params: { attack },
      });
      if (result.error) return { error: result.error };
      return result;
    } catch (error) {
      return { error };
    }
  };

  static removeType = async ({ type }) => {
    try {
      const result = await PokemonModel.executeMethod({
        method: "removeType",
        params: { type },
      });
      if (result.error) return { error: result.error };
      return result;
    } catch (error) {
      return { error };
    }
  };

  static removeGame = async ({ game }) => {
    try {
      const result = await PokemonModel.executeMethod({
        method: "removeGame",
        params: { game },
      });
      if (result.error) return { error: result.error };
      return result;
    } catch (error) {
      return { error };
    }
  };
}

export default removes;
