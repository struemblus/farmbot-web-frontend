import { TaggedResource, ResourceName } from "../resources/tagged_resources";
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

export function create(uuid: string) {
  return function (dispatch: Function, getState: GetState) {
    let resource = findByUuid(getState().resources.index, uuid);
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
  }
}

export function update(uuid: string) {
  return function (dispatch: Function, getState: GetState) {
    let resource = findByUuid(getState().resources.index, uuid);
    let { body, kind } = resource;
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
  return function (dispatch: Function, getState: GetState) {
    let resource = findByUuid(getState().resources.index, uuid);
    if (resource.body.id) {
      return Axios
        .delete<typeof resource.body>(urlFor(resource.kind) + resource.body.id)
        .then(function (resp) {
          dispatch(destroyOK(resource));
        })
        .catch(function (err: UnsafeError) {
          dispatch(destroyNO(err));
        });
    } else {
      return (d: Function, g: GetState) => Promise.resolve("")
    }
  }
}

export function list(uuid: string) { }

export function urlFor(tag: ResourceName) {
  const OPTIONS: Partial<Record<ResourceName, string>> = {
    sequences: API.current.sequencesPath,
    tools: API.current.toolsPath,
    tool_slots: API.current.toolSlotsPath,
    plants: API.current.plantsPath,
    farm_events: API.current.farmEventsPath,
    regimens: API.current.regimensPath,
    peripherals: API.current.peripheralsPath,
    points: API.current.pointsPath,
    tool_bays: API.current.toolBaysPath,
    users: API.current.usersPath,
    device: API.current.devicePath,
    images: API.current.imagesPath,
    logs: API.current.logsPath,
    regimen_items: API.current.regimensPath
  }
  let url = OPTIONS[tag];
  if (url) {
    return url;
  } else {
    throw new Error(`No resource/URL handler for ${tag} yet.
    Consider adding one to crud.ts`);
  }
}
