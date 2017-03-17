import * as React from "react";

export const updateWebcamUrl = (dispatch: Function) => (
  event: React.KeyboardEvent<HTMLInputElement>) => {
  dispatch({
    type: "CHANGE_WEBCAM_URL",
    payload: event.currentTarget.value
  });
};
