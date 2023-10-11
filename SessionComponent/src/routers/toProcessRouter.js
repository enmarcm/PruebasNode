import { Router } from "express";
import Security from "../components/Security.js";
import permissionController from "../controllers/permissionController.js"
import usersModel from "../models/BO/usersModel.js";

const iSecurity = new Security({ controller: permissionController, pathBO: '../controllers/BO' })

const toProcessRouter = Router()

toProcessRouter.post('/', async (req, res) => {
    const { user, profile } = req.session;

    const { area, method, object, params } = req.body;
    
    const permiso = await iSecurity.hasPermission({profile, area, object, method})

    if (permiso) {
        const resultMethod = await iSecurity.executeMethod({ area, object, method, params })
        
        res.send(resultMethod)
    } else {
        res.send('jaja no puedes ejecutar')
    }
})
 
export default toProcessRouter