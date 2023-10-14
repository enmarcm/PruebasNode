import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

//Las rutas siempre deben ser llamada como si estuvieran llamando desde aqui
const importJson = ({ path }) => require(path);

export default importJson