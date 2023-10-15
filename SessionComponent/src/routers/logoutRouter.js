import LogoutController from "../controllers/logoutController.js";
import { Router } from "express";
const logoutRouter = Router();

logoutRouter.get("/", LogoutController.logoutGet);

export default logoutRouter;
