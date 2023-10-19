import { Router } from "express";
import olvidoDatosController from "../controllers/olvidoDatosController.js";

const olvidoDatosRouter = Router();

olvidoDatosRouter.get("/", olvidoDatosController.getOlvidoDatos)
olvidoDatosRouter.post("/", olvidoDatosController.postOlvidoDatos)

olvidoDatosRouter.get("/cargarPreguntas", ()=>{})
olvidoDatosRouter.post("/cargarPreguntas", ()=>{})

olvidoDatosRouter.get("/enviarCorreo")

export default olvidoDatosRouter