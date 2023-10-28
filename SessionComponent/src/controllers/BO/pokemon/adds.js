/**
 * @file adds.js Este archivo se encarga de manejar los métodos para agregar elementos de Pokemon a la BDD.
 */
import { verifyAddPokemon } from "../../../schemas/pokemonSchema.js";
import PokemonModel from "../../../models/BO/pokemonModel.js";

/**
 * Clase que representa un conjunto de métodos para agregar elementos a la base de datos de Pokemon.
 */
class adds {
  /**
   * Agrega un nuevo Pokemon a la base de datos.
   * @async
   * @param {Object} options - Las opciones para agregar el Pokemon.
   * @param {string} options.name - El nombre del Pokemon.
   * @param {string} options.image - La imagen del Pokemon.
   * @param {Array} options.types - Los tipos del Pokemon.
   * @param {Array} options.attacks - Los ataques del Pokemon.
   * @param {Array} options.games - Los juegos en los que aparece el Pokemon.
   * @returns {Promise<Object>} Un objeto con el resultado de la operación o un objeto con un error.
   */
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

  /**
   * Agrega un nuevo juego a la base de datos.
   * @async
   * @param {Object} options - Las opciones para agregar el juego.
   * @param {string} options.game - El nombre del juego.
   * @param {Date} options.date - La fecha de lanzamiento del juego.
   * @returns {Promise<Object>} Un objeto con el resultado de la operación o un objeto con un error.
   */
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

  /**
   * Agrega un nuevo ataque a la base de datos.
   * @async
   * @param {Object} options - Las opciones para agregar el ataque.
   * @param {string} options.attack - El nombre del ataque.
   * @param {string} options.type - El tipo del ataque.
   * @returns {Promise<Object>} Un objeto con el resultado de la operación o un objeto con un error.
   */
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

  /**
   * Agrega un nuevo tipo a la base de datos.
   * @async
   * @param {Object} options - Las opciones para agregar el tipo.
   * @param {string} options.type - El nombre del tipo.
   * @returns {Promise<Object>} Un objeto con el resultado de la operación o un objeto con un error.
   */
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