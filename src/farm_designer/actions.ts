import { Plant, MovePlantProps, FarmEvent } from "./interfaces";
import { Thunk } from "../redux/interfaces";
import { destroy, create, update } from "../api/crud";

export function saveFarmEvent(body: Partial<FarmEvent>) {
  const action = body.id ? update : create;
  /** Typecast OK here because API will handle missing properties */
  return action({ kind: "farm_events", body: (body as FarmEvent) });
}

export function destroyFarmEvent(body: FarmEvent): Thunk {
  return destroy({ kind: "farm_events", body })
}

export function savePlant(body: Plant): Thunk {
  const action = body.id ? update : create;
  return action({ kind: "plants", body });
}

export function destroyPlant(body: Plant): Thunk {
  return destroy({ kind: "plants", body });
}

export function movePlant(payload: MovePlantProps) {
  return { type: "MOVE_PLANT", payload };
};
