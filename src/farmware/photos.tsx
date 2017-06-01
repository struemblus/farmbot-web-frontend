import * as React from "react";
import { Widget, WidgetHeader, WidgetBody, success, error } from "../ui/index";
import { ImageFlipper } from "../images/index";
import { PhotosProps } from "./interfaces";
import { devices } from "../device";
import { t } from "i18next";
import { ToolTips } from "../constants";

export class Photos extends React.Component<PhotosProps, void> {
  takePhoto = () => {
    let ok = () => success(t("Processing now. Refresh page to see result."));
    let no = () => error("Error taking photo");
    devices.current.takePhoto().then(ok, no);
  }

  render() {
    return <Widget className="photos-widget">
      <WidgetHeader helpText={ToolTips.PHOTOS} title={"Photos"}>
        <button className="gray"
          onClick={this.takePhoto}
          hidden={!this.props.images.length}>
          {t("Process Photo")}
        </button>
        <button className="gray" onClick={this.takePhoto}>
          {t("Take Photo")}
        </button>
      </WidgetHeader>
      <WidgetBody>
        <ImageFlipper images={this.props.images} />
      </WidgetBody>
    </Widget>
  }
}
