import * as React from "react";
import { Widget, WidgetHeader, WidgetBody, success, error } from "../ui/index";
import { ImageFlipper } from "../images/index";
import { PhotosProps } from "./interfaces";
import { devices } from "../device";
import { t } from "i18next";
import { ToolTips } from "../constants";
import { selectImage, detectWeeds } from "../images/actions";

const imgEnvVar = "PLANT_DETECTION_selected_image";

export class Photos extends React.Component<PhotosProps, void> {
  processPhoto = () => {
    let img = this.props.currentImage || this.props.images[0];
    if (img && img.body.id) { detectWeeds({ [imgEnvVar]: img.body.id }); }
  }

  takePhoto = () => {
    let ok = () => success(t("Processing now. Refresh page to see result."));
    let no = () => error("Error taking photo");
    devices.current.takePhoto().then(ok, no);
  }

  render() {
    return <Widget className="photos-widget">
      <WidgetHeader helpText={ToolTips.PHOTOS} title={"Photos"}>
        <button className="gray"
          onClick={this.processPhoto}
          hidden={!this.props.images.length}>
          {t("Scan")}
        </button>
        <button className="gray" onClick={this.takePhoto}>
          {t("Take Photo")}
        </button>
      </WidgetHeader>
      <WidgetBody>
        <ImageFlipper
          onFlip={(id) => { this.props.dispatch(selectImage(id)) }}
          currentImage={this.props.currentImage}
          images={this.props.images} />
      </WidgetBody>
    </Widget>
  }
}
