import { verifyAddPokemon } from "../../../schemas/pokemonSchema.js";
import PokemonModel from "../../../models/BO/pokemonModel.js";

class adds {
  static async addPokemon({ name, image, types, attacks, games }) {
    try {
      const validacion = await verifyAddPokemon({
        data: { name, image, types, attacks, games },
      });

      if (!validacion.success) return { error: validacion.error };

      const result = await PokemonModel.addPokemon({ ...validacion.data });

      if (result.error) return { error: result.error };

      return result;
    } catch (error) {
      return { error };
    }
  }

  static addGame = async ({ game , date}) => {
    try {
      const result = await PokemonModel.executeMethod({
        method: "addGame",
        params: { game , date},
      });
      if (result.error) return { error: result.error };
      return result;
    } catch (error) {
      return { error };
    }
  };

  static addAttack = async ({ attack , type}) => {
    try {
      const result = await PokemonModel.executeMethod({
        method: "addAttack",
        params: { attack , type},
      });
      if (result.error) return { error: result.error };
      return result;
    } catch (error) {
      return { error };
    }
  };

  static addType = async ({ type }) => {
    try {
      const result = await PokemonModel.executeMethod({
        method: "addType",
        params: { type },
      });
      if (result.error) return { error: result.error };
      return result;
    } catch (error) {
      return { error };
    }
  };
}

export default adds;
