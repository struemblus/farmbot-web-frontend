import { generateReducer } from "../generate_reducer";
import { ChangeApiHost, ChangeApiPort, ConfigState } from "./interfaces";

let initialState: ConfigState = {
  host: location.hostname,
  // It gets annoying to manually change the port # in dev mode.
  // I automatically point to port 3000 on local.
  port: (location.hostname === "localhost") ? "3000" : (location.port || "80")
};

export let configReducer = generateReducer<ConfigState>(initialState)
  .add<ChangeApiPort>("CHANGE_API_PORT", function (s, a) {
    s.port = a.payload.port.replace(/\D/g, "");
    return s;
  })
  .add<ChangeApiHost>("CHANGE_API_HOST", function (s, a) {
    s.host = a.payload.host;
    return s;
  });

