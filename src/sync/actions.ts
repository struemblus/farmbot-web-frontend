import { Sync } from "../interfaces";
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

function getPlants() {
  return axios.get<Plant[]>(API.current.plantsPath)
    .then((resp): Plant[] => resp.data);
};

function getPoints() {
  return axios.get<Point[]>(API.current.pointsPath)
    .then((resp): Point[] => resp.data);
};

function getImages() {
  return axios.get<Image[]>(API.current.imagesPath)
    .then((resp): Image[] => resp.data);
};

function getToolSlots() {
  return axios.get<ToolSlot[]>(API.current.toolSlotsPath)
    .then((resp): ToolSlot[] => resp.data);
};

function getToolBays() {
  return axios.get<ToolBay[]>(API.current.toolBaysPath)
    .then((resp): ToolBay[] => resp.data);
};

function getPeripherals() {
  return axios.get<Peripheral[]>(API.current.peripheralsPath)
    .then((resp): Peripheral[] => resp.data);
};

function getFarmEvents() {
  return axios.get<FarmEvent[]>(API.current.farmEventsPath)
    .then((resp): FarmEvent[] => resp.data);
};

function getSequences() {
  return axios.get<Sequence[]>(API.current.sequencesPath)
    .then((resp): Sequence[] => resp.data);
};

function getRegimens() {
  return axios.get<Regimen[]>(API.current.regimensPath)
    .then((resp): Regimen[] => resp.data);
};

function getTools() {
  return axios.get<Tool[]>(API.current.toolsPath)
    .then((resp): Tool[] => resp.data);
};

function getDevice() {
  return axios.get<DeviceAccountSettings>(API.current.devicePath)
    .then((resp): DeviceAccountSettings => resp.data);
};

function thisHalf() {
  return Promise.all([
    getTools(),
    getToolBays(),
    getToolSlots(),
    getSequences(),
    getRegimens(),
    getPlants(),
    getImages(),
    getPoints(),
    getPeripherals(),
    getFarmEvents()
  ]).then((data): Partial<Sync> => {
    let [
      tools,
      toolBays,
      toolSlots,
      sequences,
      regimens,
      plants,
      images,
      points,
      peripherals,
      farmEvents
    ] = data;
    let lolHacks: Partial<Sync> = {
      loaded: true,
      farm_events: farmEvents,
      sequences: sequences,
      regimens: regimens,
      peripherals: peripherals,
      plants: plants,
      tool_bays: toolBays,
      tool_slots: toolSlots,
      tools: tools,
      images: images,
      points: points
    };
    return lolHacks;
  }).catch(err => {
    error(err, "Error");
  });
}

function thatHalf() {
  return axios
    .get<Sync>(API.current.syncPath)
    .then((resp): Sync => {
      return resp.data;
    });
}

export function fetchSyncData() {
  return Promise
    .all([thisHalf(), thatHalf()])
    .then(function (d) {
      let partial = d[0];
      let total = d[1];
      return _.merge({}, total, partial)
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


