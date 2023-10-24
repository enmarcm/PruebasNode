import express from "express";
import session from "express-session";
import cors from "cors";

const PORT = process.env.PORT ?? 3005;
const app = express();

app.use(
  session({
    secret: "cookie",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
      name: "cookie-session",
    },
    rolling: true,
  })
);

app.use(cors())

app.post('/login', (req, res) => console.log(req.session))

app.listen(PORT, ()=>console.log('esperando en el puerto '+ PORT));
