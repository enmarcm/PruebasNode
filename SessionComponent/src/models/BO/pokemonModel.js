import iPgHandler from "../../data/pg-handler-data/iPgHandler.js";

class PokemonModel {
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
        return;
      });

      const obj = [pokemon, ...typesMap, ...attacksMap, ...gamesMap];

      const result = await iPgHandler.transaction({ querys: obj });

      return result;
    } catch (error) {
      return { error };
    }
  };

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

export default PokemonModel