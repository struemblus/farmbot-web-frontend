import { TaggedResource } from "./tagged_resources";
import { UnsafeError } from "../interfaces";
import { prettyPrintApiErrors } from "../util";
import { error } from "../ui/logger";

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

export function destroyOK(payload: TaggedResource) {
  return { type: "DESTROY_RESOURCE_OK", payload };
}

export function destroyNO(payload: any) {
  error(prettyPrintApiErrors(payload));
  return { type: "DESTROY_RESOURCE_NO", payload };
}


