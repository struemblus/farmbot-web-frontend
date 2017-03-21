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
import { findByUuid } from "../resources/reducer";

export function save(uuid: string) {
  return function (dispatch: Function, getState: GetState) {
    let resource = findByUuid(getState().resources.index, uuid);
    dispatch(((resource.body.id) ? update : create)(uuid));
  }
}

function create(uuid: string) {
  return function (dispatch: Function, getState: GetState) {
    let resource = findByUuid(getState().resources.index, uuid);
    if (resource) {
      return Axios
        .post<typeof resource.body>(urlFor(resource.kind), resource.body)
        .then(function (resp) {
          let kind = resource.kind;
          let body = resp.data;
          dispatch(createOK({ kind, body } as TaggedResource));
        })
        .catch(function (err: UnsafeError) {
          dispatch(createNO(err));
        });
    } else {
      throw new Error("GOT A BAD UUID: " + uuid)
    }
  }
}

function update(uuid: string) {
  return function (dispatch: Function, getState: GetState) {
    return Axios
      .patch<typeof resource.body>(urlFor(kind) + body.id, body)
      .then(function (resp) {
        kind = resource.kind as typeof resource.kind;
        body = resp.data as typeof resource.body;
        updateOK({ kind, body } as TaggedResource);
      })
      .catch(function (err: UnsafeError) {
        updateNO(err);
      });
  }
}

export function destroy(uuid: string) {
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

export function list(uuid: string) { }

export function urlFor(tag: ResourceTag) {
  const OPTIONS: Partial<Record<ResourceTag, string>> = {
    sequences: API.current.sequencesPath,
    tools: API.current.toolsPath,
    tool_slots: API.current.toolSlotsPath,
    plants: API.current.plantsPath,
    farm_events: API.current.farmEventsPath,
    regimens: API.current.regimensPath
  }
  let url = OPTIONS[tag];
  if (url) {
    return url;
  } else {
    throw new Error(`No resource/URL handler for ${tag} yet.
    Consider adding one to crud.ts`);
  }
}
