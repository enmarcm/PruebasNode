/**
 * @file removes.js Este archivo se encarga de manejar los métodos para eliminar elementos de Pokemon de la BDD.
 */
import PokemonModel from "../../../models/BO/pokemonModel.js";

/**
 * Clase que representa un conjunto de métodos para eliminar elementos de la base de datos de Pokemon.
 */
class removes {
  /**
   * Elimina un Pokemon de la base de datos.
   * @async
   * @param {Object} options - Las opciones para eliminar el Pokemon.
   * @param {string} options.name - El nombre del Pokemon a eliminar.
   * @returns {Promise<Object>} Un objeto con el resultado de la operación o un objeto con un error.
   */
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

  /**
   * Elimina un ataque de la base de datos.
   * @async
   * @param {Object} options - Las opciones para eliminar el ataque.
   * @param {string} options.attack - El nombre del ataque a eliminar.
   * @returns {Promise<Object>} Un objeto con el resultado de la operación o un objeto con un error.
   */
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

  /**
   * Elimina un tipo de la base de datos.
   * @async
   * @param {Object} options - Las opciones para eliminar el tipo.
   * @param {string} options.type - El nombre del tipo a eliminar.
   * @returns {Promise<Object>} Un objeto con el resultado de la operación o un objeto con un error.
   */
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

  /**
   * Elimina un juego de la base de datos.
   * @async
   * @param {Object} options - Las opciones para eliminar el juego.
   * @param {string} options.game - El nombre del juego a eliminar.
   * @returns {Promise<Object>} Un objeto con el resultado de la operación o un objeto con un error.
   */
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