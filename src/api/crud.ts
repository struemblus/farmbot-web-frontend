import { TaggedResource, ResourceTag } from "../resources/tagged_resources";
import { GetState } from "../redux/interfaces";
import { API } from "./index";
import * as Axios from "axios";
import {
  createOK,
  createNO,
  updateOK,
  updateNO,
  destroyOK,
  destroyNO
} from "../resources/actions";
import { UnsafeError } from "../interfaces";

export function create(resource: TaggedResource) {
  return function (dispatch: Function, getState: GetState) {
    return Axios
      .post<typeof resource.body>(urlFor(resource.kind), resource.body)
      .then(function (resp) {
        let kind = resource.kind as typeof resource.kind;
        let body = resp.data as typeof resource.body;
        dispatch(createOK({ kind, body } as TaggedResource));
      })
      .catch(function (err: UnsafeError) {
        dispatch(createNO(err));
      });
  }
}

export function update(resource: TaggedResource) {
  let id = _.get(resource, "body.id", -1);
  if (id < 1) {
    throw new Error("TRIED TO UPDATE AN UNSAVED RESOURCE");
  }
  return function (dispatch: Function, getState: GetState) {
    return Axios
      .patch<typeof resource.body>(urlFor(resource.kind) + id, resource.body)
      .then(function (resp) {
        let kind = resource.kind as typeof resource.kind;
        let body = resp.data as typeof resource.body;
        updateOK({ kind, body } as TaggedResource);
      })
      .catch(function (err: UnsafeError) {
        updateNO(err);
      });
  }
}

export function destroy(resource: TaggedResource) {
  let id = _.get(resource, "body.id", -1);
  if (id < 1) {
    // Don't need to do anything if it's not saved.
    return (d: Function, g: GetState) => Promise.resolve("")
  } else {
    return function (dispatch: Function, getState: GetState) {
      return Axios
        .delete<typeof resource.body>(urlFor(resource.kind) + id)
        .then(function (resp) {
          dispatch(destroyOK(resource));
        })
        .catch(function (err: UnsafeError) {
          dispatch(destroyNO(err));
        });
    }
  }
}

export function list(resource: TaggedResource) { }

export function urlFor(tag: ResourceTag) {
  const OPTIONS: Partial<Record<ResourceTag, string>> = {
    sequences: API.current.sequencesPath,
    tools: API.current.toolsPath,
    tool_slots: API.current.toolSlotsPath,
    plants: API.current.plantsPath,
    farm_events: API.current.farmEventsPath
  }
  let url = OPTIONS[tag];
  if (url) {
    return url;
  } else {
    throw new Error(`No resource/URL handler for ${tag} yet.
    Consider adding one to crud.ts`);
  }
}
