import { Plant, MovePlantProps, FarmEvent } from "./interfaces";
import { Thunk } from "../redux/interfaces";
import { destroy, create, update, createOrUpdate } from "../api/crud";
import { uuid } from "farmbot/dist";

export function saveFarmEvent(body: Partial<FarmEvent>) {
  if (!body.id) {
    console.warn("This may duplicate data in the state tree. Double check. RC");
  }
  /** Typecast OK here because API will handle missing properties */
  return createOrUpdate({
    kind: "farm_events",
    uuid: uuid(),
    body: (body as FarmEvent)
  });
}

export function destroyFarmEvent(body: FarmEvent): Thunk {
  return destroy({ kind: "farm_events", uuid: uuid(), body })
}

export function savePlant(body: Plant): Thunk {
  console.warn("This is going to leak references and denormalize data.")
  return createOrUpdate({
    kind: "plants",
    uuid: uuid(),
    body
  });
}

export function destroyPlant(body: Plant): Thunk {
  return destroy({ kind: "plants", uuid: uuid(), body });
}

export function movePlant(payload: MovePlantProps) {
  return { type: "MOVE_PLANT", payload };
};
