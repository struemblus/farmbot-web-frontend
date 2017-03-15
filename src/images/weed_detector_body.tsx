import * as React from "react";
import { HsvSlider } from "./hsv_slider";
import { FarmbotPicker } from "./farmbot_picker";
import { BlurableInput } from "../ui/index";
import { ImageFlipper } from "./image_flipper";
import { Image } from "./interfaces";

interface Props {
  images: Image[];
  // onSliderChange(): void;
}

let TODO: any;

export function WeedDetectorBody({
  images
}: Props) {
  return <div className="widget-content">
    <div className="row">
      <div className="col-md-6 col-sm-12">
        <h4>
          <i>Color Range</i>
        </h4>
        <label htmlFor="hue">HUE</label>
        <HsvSlider name={"H"}
          onChange={TODO}
          env={TODO} />
        <label htmlFor="saturation">SATURATION</label>
        <HsvSlider name={"S"}
          onChange={TODO}
          env={TODO} />
        <label htmlFor="value">VALUE</label>
        <HsvSlider name={"V"}
          onChange={TODO}
          env={TODO} />
      </div>
      <div className="col-md-6 col-sm-12">
        <FarmbotPicker h={TODO} s={TODO} v={TODO}
          hsv={TODO}
          hsl={TODO} />
      </div>
    </div>
    <div className="row">
      <div className="col-md-12 col-sm-12">
        <h4>
          <i>Processing Parameters</i>
        </h4>
      </div>

      <div className="col-md-4 col-sm-4">
        <label>BLUR</label>
        <BlurableInput type="number"
          min={0}
          max={100}
          onCommit={TODO}
          value={TODO} />
      </div>

      <div className="col-md-4 col-sm-4">
        <label>MORPH</label>
        <BlurableInput type="number"
          min={0}
          max={100}
          onCommit={TODO}
          value={TODO} />
      </div>

      <div className="col-md-4 col-sm-4">
        <label>ITERATION</label>
        <BlurableInput type="number"
          min={0}
          max={100}
          onCommit={TODO}
          value={TODO} />
      </div>
    </div>
    <ImageFlipper images={images} />
  </div>;
}
