import { Router } from "express";
import ToProcessController from "../controllers/toProcessController.js";

const toProcessRouter = Router()

toProcessRouter.post('/', ToProcessController.toProcessPost)
 
export default toProcessRouter