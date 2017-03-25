import { Regimen, RegimenItem } from "./interfaces";
import { ReduxAction } from "../redux/interfaces";
import { destroy, save } from "../api/crud";
import { TaggedRegimen } from "../resources/tagged_resources";
export function copyRegimen(payload: TaggedRegimen) {
  return {
    type: "COPY_REGIMEN",
    payload
  };
}

export function editRegimen(regimen: TaggedRegimen,
  update: Object):
  ReduxAction<undefined> {
  console.log("Lets fix this one later.")
  return {
    type: "EDIT_REGIMEN",
    payload: undefined
  };
}

export function saveRegimen(uuid: string) {
  return save(uuid);
}

export function deleteRegimen(uuid: string) {
  return destroy(uuid);
}

export function newRegimen(): ReduxAction<{}> {
  return {
    type: "NEW_REGIMEN",
    payload: {}
  };
}

export function selectRegimen(payload: TaggedRegimen): ReduxAction<TaggedRegimen> {
  return { type: "SELECT_REGIMEN", payload };
}

export function removeRegimenItem(item: RegimenItem): ReduxAction<RegimenItem> {
  return {
    type: "REMOVE_REGIMEN_ITEM",
    payload: item
  };
}

