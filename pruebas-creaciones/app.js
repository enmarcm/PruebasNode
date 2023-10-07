import PgHandler from "./pgHandler.js";
import express from "express";
const PORT = process.env.PORT ?? 3000;
const app = express();

const mainEndPoint = (req, res) => res.send("Estas en el main");

app.get("/", mainEndPoint);

const esperando = () => console.log(`Esperando en el puerto ${PORT}`);

const objConfigPg = {
  database: "mineria_datos",
  user: "postgres",
  password: "1234",
  port: 5432,
  ssl: false,
  max: 20, // set pool max size to 20
  idleTimeoutMillis: 1000, // close idle clients after 1 second
  connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
  maxUses: 7500, // close (and replace) a connection after it has been used 7500 times (see below for discussion)
};

const querys = {
  select: "select * from producto",
  selectWhere: `select * from producto where id_producto = $1`,
};

const handlerPG = new PgHandler({ config: objConfigPg, querys });

(async () => {
  const data = await handlerPG.executeQuery({
    key: "select"
  });

    const nombresProducts = data.map(e => e.no_producto)
    console.log(nombresProducts)
})();

app.listen(PORT, esperando);
