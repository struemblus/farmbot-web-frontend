import * as React from "react";

export const showUrl = (url: string, dirty: boolean) => {
  if (dirty) {
    return <p>Press save to view.</p>;
  } else {
    if (url.includes("placeholder_farmbot")) {
      return <div className="webcam-stream-unavailable">
        <img src={url} />
        <text>Camera stream not available.
        <br />Press <b>EDIT</b> to add a stream.</text>
      </div>;
    } else {
      return <img className="webcam-stream" src={url} />;
    };
  };
};
