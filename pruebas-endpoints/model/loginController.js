import importJson from "../utils/importJson.js";
const datos = importJson({ path: "../jsons/json.json" });

class LoginController {
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
    const resultado = datos.indexOf((dato) => dato.user === user);

    //TODO: FUNCION PARA VERIFICAR BLOQUEO

    datos[resultado].intentos = Number(datos[resultado].intentos) - 1;
  };
}
