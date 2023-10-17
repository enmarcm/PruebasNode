import Session from "../../components/Session.js";
import importJSON from "../../utils/importJson.js";

const configSession = importJSON({
  path: "../data/session-data/config-session.json",
});

const iSession = new Session({ config: configSession });

export default iSession;
