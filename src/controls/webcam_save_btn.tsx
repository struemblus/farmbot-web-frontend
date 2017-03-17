import * as React from "react";
import { update } from "../devices/actions";
import { t } from "i18next";
import { SaveWebcamParams, WebcamSaveBtnProps } from "./interfaces";

let saveWebcamUrl = ({ dispatch, webcam_url, updateState }:
  SaveWebcamParams) => () => {
    updateState();
    return dispatch(() => update({ webcam_url }));
  };

export function WebcamSaveBtn({ dispatch, webcamUrl, apiUrl, updateState }:
  WebcamSaveBtnProps) {
  return <button type="button"
    className="green button-like"
    onClick={
      saveWebcamUrl({ dispatch, apiUrl, webcam_url: webcamUrl, updateState })
    }>
    {t("SAVE")}
  </button>;
}
