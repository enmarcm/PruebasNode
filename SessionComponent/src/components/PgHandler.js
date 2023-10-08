import { Pool } from "pg";
import bcrypt from "bcryptjs";

/**
 * Clase que maneja la conexión y ejecución de consultas a una base de datos PostgreSQL.
 */
class PgHandler {
  /**
   * Crea una instancia de PgHandler.
   * @param {Object} options - Opciones para la configuración y consultas de la base de datos.
   * @param {Object} options.config - Configuración de la conexión a la base de datos.
   * @param {Object} options.querys - Consultas predefinidas para la base de datos.
   * @param {number} [options.saltRounds=10] - Número de rondas para la generación de saltos para la encriptación con bcrypt.
   */
  constructor({ config, querys }) {
    /**
     * Configuración de la conexión a la base de datos.
     * @type {Object}
     */
    this.config = config;
    /**
     * Consultas predefinidas para la base de datos.
     * @type {Object}
     */
    this.querys = querys;
    /**
     * Número de rondas para la generación de saltos para la encriptación con bcrypt.
     * @type {number}
     */
    this.saltRounds = saltRounds;
    /**
     * Pool de conexiones a la base de datos.
     * @type {Pool}
     */
    this.pool = new Pool(this.config);
  }

  /**
   * Ejecuta una consulta a la base de datos.
   * @async
   * @param {Object} options - Opciones para la ejecución de la consulta.
   * @param {string} options.key - Clave de la consulta predefinida a ejecutar.
   * @param {Array} [options.params=[]] - Parámetros para la consulta.
   * @returns {Promise<Array|Error>} - Resultado de la consulta o un objeto Error si ocurre un error.
   */
  executeQuery = async ({ key, params = [] }) => {
    try {
      const query = this.querys[key];
      const { rows } = await this.pool.query(query, params);
      return rows;
    } catch (error) {
      return error;
    }
  };

  /**
   * Conecta a la base de datos.
   * @async
   * @returns {Promise<import('pg').Client>} - Cliente de la conexión a la base de datos.
   */
  connect = async () => {
    try {
      return await this.pool.connect();
    } catch (error) {
      return error;
    }
  };

  /**
   * Libera la conexión a la base de datos.
   * @async
   * @returns {Promise<void>}
   */
  release = async () => {
    try {
      await this.pool.release();
    } catch (error) {
      return error;
    }
  };

  /**
   * Encripta un dato utilizando bcrypt.
   * @async
   * @param {Object} options - Opciones para la encriptación.
   * @param {string} options.dato - Dato a encriptar.
   * @returns {Promise<string>} - Dato encriptado.
   */
  encriptar = async ({ dato }) => {
    try {
      const datoEncriptado = await bcrypt.hash(dato, this.saltRounds);
      return datoEncriptado;
    } catch (error) {
      return error;
    }
  };

  /**
   * Compara un dato con un hash encriptado utilizando bcrypt.
   * @async
   * @param {Object} options - Opciones para la comparación.
   * @param {string} options.dato - Dato a comparar.
   * @param {string} options.hash - Hash encriptado a comparar.
   * @returns {Promise<boolean>} - Resultado de la comparación (true si son iguales, false si no lo son).
   */
  compararEncriptado = async ({ dato, hash }) => {
    try {
      const resultado = await bcrypt.compare(dato, hash);
      return resultado;
    } catch (error) {
      return error;
    }
  };
}

export default PgHandler;
