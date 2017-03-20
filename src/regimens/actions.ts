import { Regimen, RegimenItem } from "./interfaces";
import { ReduxAction } from "../redux/interfaces";
import { warning, success, error } from "../ui";
import * as Axios from "axios";
import { regimenSerializer } from "./serializers";
import { prettyPrintApiErrors } from "../util";
import { t } from "i18next";
import { API } from "../api";
import { UnsafeError } from "../interfaces";
import { destroy, create, update } from "../api/crud";

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
    payload: {
      regimen,
      update
    }
  };
}

export function saveRegimen(body: Regimen) {
  return function (dispatch: Function) {
    const action = body.id ? create : update;
    return dispatch(action({ kind: "regimens", body }));
  };
}

function saveRegimenErr(err: UnsafeError) {
  error(prettyPrintApiErrors(err),
    t("Unable to save regimen."));
}

export function deleteRegimen(regimen: Regimen) {
  return destroy({
    kind: "regimens",
    body: regimen
  });
}

function deleteRegimenErr(payload: Error) {
  error(t("Unable to delete regimen."));
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

