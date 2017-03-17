import { Sync, Log } from "../interfaces";
import { error } from "../ui";
import { API } from "../api";
import * as axios from "axios";
import { Sequence } from "../sequences/interfaces";
import { Tool, ToolBay, ToolSlot } from "../tools/interfaces";
import { Regimen } from "../regimens/interfaces";
import { Peripheral } from "../controls/peripherals/interfaces";
import { FarmEvent, Plant, Point } from "../farm_designer/interfaces";
import { Image } from "../images/interfaces";
import { DeviceAccountSettings } from "../devices/interfaces";


export function fetchSyncData() {
  return Promise
    .all([chunk1(), chunk2()])
    .then(function (d): Sync {
      return _.merge({}, d[0], d[1]) as Sync;
    });
}
let sync = <T>(url: string) => axios.get<T>(url).then((r): T => r.data);

/** It's theoretically possible to put all 13 resource requests into a single
 * call to Promise.all.
 * It seems that typescript stops tracking types after the first 10 requests
 * though. I prefer having type checks over fewer lines of code, so I had to
 * put the API requests into chunks of 10.
 */
function chunk1() {
  return Promise
    .all([
      sync<DeviceAccountSettings>(API.current.devicePath),
      sync<FarmEvent[]>(API.current.farmEventsPath),
      sync<Image[]>(API.current.imagesPath),
      sync<Log[]>(API.current.logsPath),
      sync<Peripheral[]>(API.current.peripheralsPath),
      sync<Plant[]>(API.current.plantsPath),
      sync<Point[]>(API.current.pointsPath),
      sync<Regimen[]>(API.current.regimensPath),
      sync<Sequence[]>(API.current.sequencesPath),
      sync<ToolBay[]>(API.current.toolBaysPath),
    ])
    .then(function (data): Partial<Sync> {
      return {
        device: data[0],
        farm_events: data[1],
        images: data[2],
        logs: data[3],
        peripherals: data[4],
        plants: data[5],
        points: data[6],
        regimens: data[7],
        sequences: data[8],
        tool_bays: data[9],
      };
    });
}

function chunk2() {
  return Promise
    .all([
      sync<Tool[]>(API.current.toolsPath),
      sync<ToolSlot[]>(API.current.toolSlotsPath),
      sync<Sync>(API.current.syncPath),
    ])
    .then(function (data): Partial<Sync> {
      return {
        tools: data[0],
        tool_slots: data[1],
        ...data[2]
      }
    });
}

export function fetchSyncDataOk(sync: Sync) {
  return {
    type: "FETCH_SYNC_OK",
    payload: sync
  };
}

export function fetchSyncDataNo(err: Error) {
  return {
    type: "FETCH_SYNC_NO",
    payload: {}
  };
}
