import iPgHandler from "../data/pg-handler-data/iPgHandler.js";

class olvidoDatosModel {
  static cargarPreguntas = async ({ user }) => {
    const preguntas = await this.cargarTodasPreguntas({ user });

    const preguntasSeleccionadas = this.#seleccionarDosPreguntas({ preguntas });

    return preguntasSeleccionadas;
  };

  static cargarTodasPreguntas = async ({ user }) => {
    const preguntas = await iPgHandler.executeQuery({
      key: "cargarTodasPreguntas",
      params: [user],
    });

    return preguntas;
  };

  static #seleccionarDosPreguntas = ({ preguntas } = []) => {
    if (preguntas.length === 0)
      return { error: "No hay preguntas para seleccionar" };

    const index1 = Math.floor(Math.random() * preguntas.length);

    let index2 = Math.floor(Math.random() * preguntas.length);

    while (index2 === index1) {
      index2 = Math.floor(Math.random() * preguntas.length);
    }

    const result = [preguntas[index1], preguntas[index2]];
    return result;
  };
}

export default olvidoDatosModel;
