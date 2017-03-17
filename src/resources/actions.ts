import { TaggedResource } from "./tagged_resources";
import { UnsafeError } from "../interfaces";

export function createOK(payload: TaggedResource) {
  return { action: "CREATE_RESOURCE_OK", payload };
}

export function createNO(payload: UnsafeError) {
  return { action: "CREATE_RESOURCE_NO", payload };
}

export function updateOK(payload: TaggedResource) {
  return { action: "UPDATE_RESOURCE_OK", payload };
}

export function updateNO(payload: UnsafeError) {
  return { action: "UPDATE_RESOURCE_NO", payload };
}

export function destroyOK(payload: number) {
  return { action: "DESTROY_RESOURCE_OK", payload };
}

export function destroyNO(payload: number) {
  return { action: "DESTROY_RESOURCE_NO", payload };
}


