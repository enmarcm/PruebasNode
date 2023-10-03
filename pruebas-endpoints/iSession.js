import Session from "./Session.js";
const objConfig = {
  secret: "1234",
  saveUninitialized: false,
  resave: false,
};

const iSession = new Session({ config: objConfig });

export default iSession
