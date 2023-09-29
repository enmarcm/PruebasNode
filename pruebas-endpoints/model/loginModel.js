import importJson from "../utils/importJson.js";
const datos = importJson({ path: "../jsons/json.json" });

class LoginModel {
  static userExist = ({ user }) => {
    const resultado = datos.find((dato) => dato.user === user);

    if (!resultado) return false;

    return true;
  };

  static passwordCorrect = ({ user, password }) => {
    const resultado = datos.find(
      (dato) => dato.user === user && dato.password === password
    );

    if (!resultado) return false;

    return true;
  };

  static disminuirIntentos = ({ user }) => {
    const resultado = this.#encuentraIndice({ user });
    if (!resultado) return false;

    if (this.verificaBloqueo({ user })) return;

    datos[resultado].intentos = Number(datos[resultado].intentos) - 1;
  };

  static verificaBloqueo = ({ user }) => {
    const indice = this.#encuentraIndice({ user });
    if (!indice) return false;

    if (Number(datos[indice].intentos) <= 0) return true;
    else return false;
  };

  static #encuentraIndice = ({ user }) => {
    
    const indice = datos.findIndex((dato) => dato.user == user);

    if (indice === -1) return false;

    return indice;
  };

  static restaurarIntentos = ({ user }) => {
    const indice = this.#encuentraIndice({ user })
    if(!indice) return false
    datos[indice].intentos = 3
  }

  static retornarDatos = ({ user, password }) => {
    if (this.userExist({ user }) && this.passwordCorrect({ user, password })) {
      const indice = this.#encuentraIndice({ user })
      return datos[indice]
    }
  }
}

export default LoginModel