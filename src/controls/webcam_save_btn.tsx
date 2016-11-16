import * as React from "react";
import { updateDevice } from "../devices/actions";
import { t } from "i18next";

interface SaveWebcamParams {
  dispatch: Function;
  apiUrl: string;
  webcam_url: string;
  updateState: Function;
};

let saveWebcamUrl = ({dispatch, apiUrl, webcam_url, updateState}: SaveWebcamParams) => () => {
  updateState();
  return dispatch(() => updateDevice(apiUrl, { webcam_url }, dispatch));
};

interface WebcamSaveBtnProps {
  dispatch: Function;
  webcamUrl: string;
  apiUrl: string;
  updateState: Function;
}

export function WebcamSaveBtn({dispatch, webcamUrl, apiUrl, updateState}: WebcamSaveBtnProps) {
  return <button type="button"
    className="green button-like widget-control"
    onClick={
      saveWebcamUrl({
        dispatch,
        apiUrl,
        webcam_url: webcamUrl,
        updateState
      })
    }>
    {t("SAVE")}
  </button>;
}
