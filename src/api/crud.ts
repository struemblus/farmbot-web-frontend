import { TaggedResource, ResourceTag } from "../resources/tagged_resources";
import { GetState, Thunk } from "../redux/interfaces";
import { API } from "./index";
import * as Axios from "axios";
import { createOK, createNO, updateOK, updateNO, destroyOK, destroyNO } from "../resources/actions";
import { UnsafeError } from "../interfaces";

export function create(resource: TaggedResource) {
  return function (dispatch: Thunk, getState: GetState) {
    return Axios
      .post<typeof resource.body>(urlFor(resource.kind), resource.body)
      .then(function (resp) {
        let kind = resource.kind as typeof resource.kind;
        let body = resp.data as typeof resource.body;
        createOK({ kind, body } as TaggedResource);
      })
      .catch(function (err: UnsafeError) {
        createNO(err);
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
    throw new Error("TRIED TO UPDATE AN UNSAVED RESOURCE");
  }
  return function (dispatch: Function, getState: GetState) {
    return Axios
      .delete<typeof resource.body>(urlFor(resource.kind) + id)
      .then(function (resp) {
        destroyOK(id);
      })
      .catch(function (err: UnsafeError) {
        destroyNO(err);
      });
  }
}

export function list(resource: TaggedResource) { }

interface Idea {
  url: string;
}

export function urlFor(tag: ResourceTag) {
  const OPTIONS: Record<ResourceTag, string> = {
    "sequence": API.current.sequencesPath,
    "tool": API.current.toolsPath,
    "device": API.current.devicePath
  }
  return OPTIONS[tag];
}
