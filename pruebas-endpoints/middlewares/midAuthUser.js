import LoginController from "../controllers/loginController.js";

//Directamente en este middleware debo colocar todo lo que tenga que ver con autenticacion, pero antes le preguntare al profe
const midAuthUser = (req, res, next) => LoginController.middlewareAuth(req, res, next)

export default midAuthUser;
