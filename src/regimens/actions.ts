import { Regimen, RegimenItem } from "./interfaces";
import { ReduxAction } from "../redux/interfaces";
import { destroy, save } from "../api/crud";
export function copyRegimen(payload: Regimen) {
  return {
    type: "COPY_REGIMEN",
    payload
  };
}

export function editRegimen(regimen: Regimen,
  update: Object):
  ReduxAction<{ regimen: Regimen, update: Object }> {
  return {
    type: "EDIT_REGIMEN",
    payload: { regimen, update }
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

export function selectRegimen(payload: Regimen): ReduxAction<Regimen> {
  return { type: "SELECT_REGIMEN", payload };
}

export function removeRegimenItem(item: RegimenItem): ReduxAction<RegimenItem> {
  return {
    type: "REMOVE_REGIMEN_ITEM",
    payload: item
  };
}

