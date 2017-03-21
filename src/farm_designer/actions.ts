import { MovePlantProps } from "./interfaces";
import { Thunk } from "../redux/interfaces";
import { destroy, save } from "../api/crud";

export function saveFarmEvent(uuid: string) {
  return save(uuid);
}

export function destroyFarmEvent(uuid: string) {
  return destroy(uuid)
}

export function savePlant(uuid: string) {
  return save(uuid);
}

export function destroyPlant(uuid: string): Thunk {
  return destroy(uuid);
}

export function movePlant(payload: MovePlantProps) {
  return { type: "MOVE_PLANT", payload };
};
