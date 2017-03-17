import { RestResources } from "./interfaces";

export function confirmDeletion(resource: keyof RestResources,
  id: number) {
  return {
    type: "RESOURCE_DELETE_OK",
    payload: { resource, id }
  }
}

export function deletionError(resource: keyof RestResources,
  id: number) {
  return {
    type: "RESOURCE_DELETE_NO",
    payload: { resource, id }
  }
}
