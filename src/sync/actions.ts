import { DeprecatedSync, Log } from "../interfaces";
import { API } from "../api";
import * as axios from "axios";
import { Sequence } from "../sequences/interfaces";
import { Tool, ToolBay, ToolSlot } from "../tools/interfaces";
import { Regimen } from "../regimens/interfaces";
import { Peripheral } from "../controls/peripherals/interfaces";
import { FarmEvent, Plant, Point } from "../farm_designer/interfaces";
import { Image } from "../images/interfaces";
import { DeviceAccountSettings } from "../devices/interfaces";


export function fetchDeprecatedSyncData() {
  return Promise
    .all([chunk1(), chunk2()])
    .then(function (d): DeprecatedSync {
      return _.merge({}, d[0], d[1]) as DeprecatedSync;
    });
}
let fetch = <T>(url: string) => axios.get<T>(url).then((r): T => r.data);

/** It's theoretically possible to put all 13 resource requests into a single
 * call to Promise.all.
 * It seems that typescript stops tracking types after the first 10 requests
 * though. I prefer having type checks over fewer lines of code, so I had to
 * put the API requests into chunks of 10.
 */
function chunk1() {
  return Promise
    .all([
      fetch<DeviceAccountSettings>(API.current.devicePath),
      fetch<FarmEvent[]>(API.current.farmEventsPath),
      fetch<Image[]>(API.current.imagesPath),
      fetch<Log[]>(API.current.logsPath),
      fetch<Peripheral[]>(API.current.peripheralsPath),
      fetch<Plant[]>(API.current.plantsPath),
      fetch<Point[]>(API.current.pointsPath),
      fetch<Regimen[]>(API.current.regimensPath),
      fetch<Sequence[]>(API.current.sequencesPath),
      fetch<ToolBay[]>(API.current.toolBaysPath),
    ])
    .then(function (data): Partial<DeprecatedSync> {
      return {
        device: data[0],
        api_version: "-------",
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
      fetch<Tool[]>(API.current.toolsPath),
      fetch<ToolSlot[]>(API.current.toolSlotsPath),
      fetch<DeprecatedSync>(API.current.syncPath),
    ])
    .then(function (data): Partial<DeprecatedSync> {
      return {
        tools: data[0],
        tool_slots: data[1],
        loaded: true,
        ...data[2]
      }
    });
}

export function fetchDeprecatedSyncDataOk(payload: DeprecatedSync) {
  return {
    type: "FETCH_SYNC_OK", payload };
}

export function fetchDeprecatedSyncDataNo(err: Error) {
  return {
    type: "FETCH_SYNC_NO",
    payload: {}
  };
}
