import LoginController from "../controllers/loginController.js";

//Directamente en este middleware debo colocar todo lo que tenga que ver con autenticacion, pero antes le preguntare al profe
const midAuthUser = (req, res, next) => {
  if (LoginController.verifyUser(req, res)) return;
  if (LoginController.verifyBlockedUser(req, res)) return;
  if (LoginController.verifyPassword(req, res)) return;

  next();
};

export default midAuthUser;
