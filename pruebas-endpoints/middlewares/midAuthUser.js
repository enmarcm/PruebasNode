import LoginController from "../controllers/loginController.js";

export const midAuthUser = (req, res, next) => {
  if (
    LoginController.verifyPassword(req, res) ||
    LoginController.verifyUser(req, res)
  )
    return;

  next();
};
