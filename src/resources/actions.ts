import { TaggedResource } from "./tagged_resources";
import { UnsafeError } from "../interfaces";
import { prettyPrintApiErrors } from "../util";
import { error } from "../ui/logger";
import { Thunk } from "../redux/interfaces";

export function createOK(payload: TaggedResource) {
  return { type: "CREATE_RESOURCE_OK", payload };
}

export function updateOK(payload: TaggedResource) {
  return { type: "UPDATE_RESOURCE_OK", payload };
}

export function destroyOK(payload: TaggedResource) {
  return { type: "DESTROY_RESOURCE_OK", payload };
}

export function saveResource(uuid: string) {

}

/** Generalized error handler when there are not special error handling
 * requirements */
function generalizedError(payload: UnsafeError) {
  error(prettyPrintApiErrors(payload));
  return {
    type: "*_RESOURCE_NO",
    payload: {}
  };
};

export let destroyNO = generalizedError;
export let createNO = generalizedError;
export let updateNO = generalizedError;
