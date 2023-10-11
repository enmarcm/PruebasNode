import { Router } from "express";
import Security from "../components/Security.js";
import permissionController from "../controllers/permissionController.js"

const iSecurity = new Security({ controller: permissionController, pathBO: '../controllers' })

const toProcessRouter = Router()

toProcessRouter.post('/', async (req, res) => {
    const { user, profile } = req.session;

    const { area, method, object } = req.body;
    
    console.log(profile, area, method, object)
    
    const permiso = await iSecurity.hasPermission({profile, area, object, method})

    res.send(permiso)
})
 
export default toProcessRouter