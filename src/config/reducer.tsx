import { generateReducer } from "../generate_reducer";
import { ChangeApiHost, ChangeApiPort, ConfigState } from "./interfaces";

let initialState: ConfigState = {
  host: location.hostname,
  port: (location.port || "80")
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

