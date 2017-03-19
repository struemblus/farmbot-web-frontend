import { TaggedResource } from "./tagged_resources";
import { UnsafeError } from "../interfaces";

export function createOK(payload: TaggedResource) {
  return { type: "CREATE_RESOURCE_OK", payload };
}

export function createNO(payload: UnsafeError) {
  return { type: "CREATE_RESOURCE_NO", payload };
}

export function updateOK(payload: TaggedResource) {
  return { type: "UPDATE_RESOURCE_OK", payload };
}

export function updateNO(payload: UnsafeError) {
  return { type: "UPDATE_RESOURCE_NO", payload };
}

export function destroyOK(payload: number) {
  return { type: "DESTROY_RESOURCE_OK", payload };
}

export function destroyNO(payload: number) {
  return { type: "DESTROY_RESOURCE_NO", payload };
}


