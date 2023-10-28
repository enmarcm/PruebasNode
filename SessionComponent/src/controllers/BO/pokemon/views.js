/**
 * @file views.js Este archivo se encarga de manejar las vistas de Pokemon con la BDD.
 */
import PokemonModel from "../../../models/BO/pokemonModel.js";

/**
 * Clase que representa un conjunto de métodos para visualizar elementos de la base de datos de Pokemon.
 */
class views {
  /**
   * Obtiene todos los Pokemons de la base de datos.
   * @async
   * @returns {Promise<Object>} Un objeto con el resultado de la operación o un objeto con un error.
   */
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

  /**
   * Obtiene todos los ataques de la base de datos.
   * @async
   * @returns {Promise<Object>} Un objeto con el resultado de la operación o un objeto con un error.
   */
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

  /**
   * Obtiene todos los tipos de la base de datos.
   * @async
   * @returns {Promise<Object>} Un objeto con el resultado de la operación o un objeto con un error.
   */
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

  /**
   * Obtiene un Pokemon de la base de datos.
   * @async
   * @param {Object} options - Las opciones para obtener el Pokemon.
   * @param {string} options.name - El nombre del Pokemon a obtener.
   * @returns {Promise<Object>} Un objeto con el resultado de la operación o un objeto con un error.
   */
  static viewPokemon = async ({ name }) => {
    try {
      const result = await PokemonModel.executeMethod({
        method: "viewPokemon",
        params: { name: name.toLowerCase() },
      });
      if (result.error) return { error: result.error };
      return result;
    } catch (error) {
      return { error };
    }
  };
}

export default views;