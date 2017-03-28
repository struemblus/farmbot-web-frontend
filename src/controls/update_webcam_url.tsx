import * as React from "react";

export const updateWebcamUrl = (payload: string) => {
  return { type: "CHANGE_WEBCAM_URL", payload };
};
