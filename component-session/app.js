import express from "express";
import Session from "./Session.js";

const configSession = {
  secret: "pruebas",
  resave: false,
  saveUninitialized: false,
};
const iSession = new Session({ config: configSession });

const PORT = process.env.PORT ?? 9923;
const app = express();
app.use(express.json());

app.use(iSession.loadSession)

const auth = (req, res, next) => {
  const { user, password } = req.body;

  if (user != "enmanuel" || password != "enmanuel") {
    return res.json({ message: "Usuario o contraseña incorrecta" });
  }

  next();
};

app.post("/login", auth, (req, res) => {
  const { user, password } = req.body;

  iSession.createSesion({ req, res, infoUser: { user, password } });

});

const auth2 = (req, res, next) => {
  if (!iSession.sessionExist(req)) {
    return res.json({ message: "No tiene una sesion iniciada" });
  }

  next();
}

app.get("/logout", (req, res) => {
  console.log(req.session)
  iSession.destroySession(req);
  res.json({ message: "Sesion cerrada" });
})

app.listen(PORT, () => console.log(`Esperando en el puerto ${PORT}...`));
