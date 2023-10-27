import iPgHandler from "../../data/pg-handler-data/iPgHandler.js";

/**
 * Clase que representa el modelo de datos para los Pokemones.
 */
class PokemonModel {
  /**
   * Agrega un nuevo Pokemon a la base de datos.
   * @async
   * @param {Object} options - Las opciones para agregar el Pokemon.
   * @param {string} options.name - El nombre del Pokemon.
   * @param {string} options.image - La imagen del Pokemon.
   * @param {Array<string>} options.types - Los tipos del Pokemon.
   * @param {Array<string>} options.attacks - Los ataques del Pokemon.
   * @param {Array<string>} options.games - Los juegos en los que aparece el Pokemon.
   * @returns {Promise<Object>} El objeto JSON con el resultado de la transacción o un mensaje de error.
   */
  static addPokemon = async ({ name, image, types, attacks, games }) => {
    try {
      const pokemon = { key: "addPokemon", params: [name, image] };

      const typesMap = types.map((type) => {
        const obj = { key: "addPokemonTypes", params: [name, type] };
        return obj;
      });

      const attacksMap = attacks.map((attack) => {
        const obj = { key: "addPokemonAttacks", params: [name, attack] };
        return obj;
      });

      const gamesMap = games.map((game) => {
        const obj = { key: "addPokemonGames", params: [name, game] };
        return obj;
      });

      const obj = [pokemon, ...typesMap, ...attacksMap, ...gamesMap];

      const result = await iPgHandler.transaction({querys : obj});

      if(result.command === 'COMMIT')
      return {message: "Se inserto correctamente el pokemon"};
    } catch (error) {
      console.log(error)
      return { error };
    }
  };

  /**
   * Ejecuta un método en la base de datos.
   * @async
   * @param {Object} options - Las opciones para ejecutar el método.
   * @param {string} options.method - El nombre del método a ejecutar.
   * @param {Array} options.params - Los parámetros para el método.
   * @returns {Promise<Object>} El objeto JSON con el resultado de la ejecución del método o un mensaje de error.
   */
  static executeMethod = async ({ method, params }) => {
    //*Importante, los params deben estar ordenados, tal cual como estan en el archivo de querys para que funcione
    //*El query debe llamarse igual al metodo para que funcione
    try {
      const parametros = [];
      for (const key in params) {
        parametros.push(params[key]);
      }
      const result = await iPgHandler.executeQuery({
        key: method,
        params: parametros,
      });
      return result;
    } catch (error) {
      return { error };
    }
  };
}

export default PokemonModel;
