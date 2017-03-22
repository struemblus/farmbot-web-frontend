import { TaggedResource, ResourceName, TaggedSequence, isTaggedResource } from "../resources/tagged_resources";
import { GetState, ReduxAction } from "../redux/interfaces";
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
import { descriptiveUUID } from "../resources/util";
import { defensiveClone } from "../util";

export interface EditResourceParams {
  uuid: string;
  update: object;
}

export function edit(tr: TaggedResource, update: Partial<typeof tr.body>) {
  return {
    type: "EDIT_RESOURCE",
    payload: { uuid: tr.uuid, update }
  }
}

/** Initialize (but don't save) an indexed / tagged resource. */
export function init(resource: TaggedResource): ReduxAction<TaggedResource> {
  resource.dirty = true;
  /** Technically, this happens in the reducer, but I like to be extra safe. */
  resource.uuid = descriptiveUUID(resource.body.id, resource.kind);
  return {
    type: "INIT_RESOURCE",
    payload: resource
  }
}
export function save(uuid: string) {
  return function (dispatch: Function, getState: GetState) {
    let resource = findByUuid(getState().resources.index, uuid);
    dispatch(((resource.body.id) ? update : create)(uuid));
  }
}

function create(uuid: string) {
  return function (dispatch: Function, getState: GetState) {
    let resource = findByUuid(getState().resources.index, uuid);
    return Axios
      .post<typeof resource.body>(urlFor(resource.kind), resource.body)
      .then(function (resp) {
        let r1 = defensiveClone(resource);
        let r2 = { body: defensiveClone(resp.data) };
        let newTR = _.merge({}, r1, r2);
        if (isTaggedResource(newTR)) {
          dispatch(createOK(newTR));
        } else {
          throw new Error("Just saved a malformed TR.");
        }
      })
      .catch(function (err: UnsafeError) {
        dispatch(createNO(err));
      });
  }
}

function update(uuid: string) {
  return function (dispatch: Function, getState: GetState) {
    let resource = findByUuid(getState().resources.index, uuid);
    let { body, kind } = resource;
    return Axios
      .patch<typeof resource.body>(urlFor(kind) + body.id, body)
      .then(function (resp) {
        let r1 = defensiveClone(resource);
        let r2 = { body: defensiveClone(resp.data) };
        let newTR = _.merge({}, r1, r2);
        if (isTaggedResource(newTR)) {
          dispatch(updateOK(newTR));
        } else {
          throw new Error("Just saved a malformed TR.");
        }
      })
      .catch(function (err: UnsafeError) {
        dispatch(updateNO(err));
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

function urlFor(tag: ResourceName) {
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
