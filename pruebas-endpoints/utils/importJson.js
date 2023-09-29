import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const importJson = ({ path }) => require(path);

export default importJson