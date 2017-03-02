import * as Axios from "axios";
import { hasKey } from "./util";
import { ResourceName, DataChangeType, Dictionary } from "farmbot/dist";
import { devices } from "./device";

type X = Axios.AxiosXHR<any>;
let METHOD_MAP: Dictionary<DataChangeType> = {
  "post": "add",
  "put": "update",
  "patch": "update",
  "delete": "remove"
};
let METHODS = ["post", "put", "patch", "delete"];
let RESOURCES: ResourceName[] = [
  "images", "plants", "regimens", "peripherals", "tool_bays",
  "logs", "sequences", "farm_events", "tool_slots", "tools", "points", "users",
  "device"
];

export function maybeInvalidateSync(input: X): X {
  let method = input.config.method;
  if (method && METHODS.includes(method || "?")) {
    notifyBotOfChanges(input.config.url, METHOD_MAP[method]);
  };
  return input;
}

// PROBLEM:       The bot doesn't know if the user has changed any of the data.
// SOLUTION:      Create a push notification system on the API.
// FAST SOLUTION: Ping the bot every time we push "save" or "update".
//                Our hope is to eventually move this logic into the API.
function notifyBotOfChanges(url: string, action: DataChangeType) {
  (url || "")
    .split("/")
    .filter((chunk: ResourceName) => {
      return RESOURCES.includes(chunk);
    })
    .map(function (resource) {
      console.info("BUSTING " + resource + " CACHE ON THE DEVICE NOW");
      devices
        .current
        .dataUpdate(action, { [resource]: "*" });
    });
}


