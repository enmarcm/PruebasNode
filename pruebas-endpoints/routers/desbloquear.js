import { Router } from "express";
import LoginController from "../controllers/loginController.js";

const desbloqueoRouter = Router();

desbloqueoRouter.post("/", (req, res) => {
  const {user} = req.body
  LoginController.desbloquearUsuario({ user});
  return res.json({ content: `El usuario ${req.body.user} ha sido desbloqueado` });
});

export default desbloqueoRouter