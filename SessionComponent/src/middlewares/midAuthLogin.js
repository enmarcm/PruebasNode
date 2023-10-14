import LoginController from "../controllers/loginController.js";

const midAuthLogin = async (req, res, next) => await LoginController.midAuth(req, res, next);

export default midAuthLogin