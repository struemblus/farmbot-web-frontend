import * as Axios from "axios";
import { ResourceName, DataChangeType, Dictionary } from "farmbot/dist";
import { devices } from "./device";
import { box } from "boxed_value";

export type Xhr = Axios.AxiosXHR<{}>;
export let METHOD_MAP: Dictionary<DataChangeType> = {
  "post": "add",
  "put": "update",
  "patch": "update",
  "delete": "remove"
};
export let METHODS = ["post", "put", "patch", "delete"];
export let RESOURCES: ResourceName[] = [
  "images", "plants", "regimens", "peripherals", "logs", "sequences",
  "farm_events", "tool_slots", "tools", "points", "device"];

// PROBLEM:       The bot doesn't know if the user has changed any of the data.
// GOOD SOLUTION: Create a push notification system on the API.
// FAST SOLUTION: Ping the bot every time we push "save" or "update".
//                Our hope is to eventually move this logic into the API.
export function notifyBotOfChanges(url: string | undefined, action: DataChangeType) {
  console.log("URL IS: " + url);
  if (url) {
    url.split("/").filter((chunk: ResourceName) => {
      return RESOURCES.includes(chunk);
    }).map(async function (resource: ResourceName) {
      devices.current.dataUpdate(action, { [resource]: inferUpdateId(url) });
    });
  }
}

/** More nasty hacks until we have time to implement proper API push state
 * notifications. */
function inferUpdateId(url: string) {
  let ids = url
    .split("/")
    .filter(x => x.includes(",")) // Dont allow batch endpoints to participate.
    .map(x => parseInt(x))
    .filter(x => !_.isNaN(x));

  return ids.length === 1 ? ("" + ids[0]) : "*";
}

/** The input of an axios error interceptor is an "any" type.
 * Sometimes it will be a real Axios error, other times it will not be.
 */
export interface SafeError {
  response: {
    status: number;
  };
}

/** Prevents hard-to-find NPEs and type errors inside of interceptors. */
export function isSafeError(x: SafeError | any): x is SafeError {
  return !!(
    (box(x).kind === "object") &&
    (box(x.response).kind === "object") &&
    (box(x.response.status).kind === "number"));
}
