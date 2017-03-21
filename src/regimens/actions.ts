import { Regimen, RegimenItem } from "./interfaces";
import { ReduxAction } from "../redux/interfaces";
import {
  destroy,
  create as _create,
  update as _update
} from "../api/crud";
import { warning } from "../ui/logger";
import { t } from "i18next";
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

export function saveRegimen(body: Regimen) {
  return function (dispatch: Function) {
    const action = body.id ? _update : _create;
    return dispatch(action({ kind: "regimens", body }));
  };
}

export function deleteRegimen(regimen: Regimen) {
  return destroy({
    kind: "regimens",
    body: regimen
  });
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

