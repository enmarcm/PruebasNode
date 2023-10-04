import { Router } from "express";

const contentRouter = Router();

contentRouter.get("/", (req, res) => {
  console.log(req.session);
  const { user, email, rol } = req.body;
  res.set("content-type: text/plane; charset=utf-8").send(`Hola, como estás ${user}, actualmente tienes el rol de ${rol}`)
});

export default contentRouter;
