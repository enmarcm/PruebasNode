import LoginController from "../controllers/loginController";

const midAuthLogin = async (req, res, next) => await LoginController.midAuth(req, res, next);

export default midAuthLogin