import * as React from "react";
import { HSV, HiLo } from "./interfaces";
import { RangeSlider } from "@blueprintjs/core/dist/components/slider/rangeSlider";
import { WeedDetectorENV } from "./index";

/** Max HSV allowed by farmbot weed detector. */
const RANGE: HSV<HiLo> = {
  H: { lo: 0, hi: 179 },
  S: { lo: 0, hi: 255 },
  V: { lo: 0, hi: 255 }
};

/** Default HSV if none found on bot. */
const DEFAULTS: HSV<HiLo> = {
  H: { lo: 30, hi: 90 },
  S: { lo: 50, hi: 255 },
  V: { lo: 50, hi: 255 }
};

interface EnvSliderProps {
  name: keyof HSV<{}>;
  env: Partial<WeedDetectorENV>;
  onChange?: (key: keyof HSV<{}>, val: [number, number]) => void;
}

type EnvSliderState = Partial<HiLo>;

export class HsvSlider extends React.Component<EnvSliderProps, EnvSliderState> {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.onRelease();
  }

  onChange = (range: [number, number]) => {
    this.setState({
      hi: range[1],
      lo: range[0]
    });
  }

  onRelease = () => {
    let cb = this.props.onChange;
    if (cb) { cb(this.props.name, [this.lo, this.hi]); }
  }

  get hi() {
    let { hi } = this.state;
    let { name } = this.props;
    let primary = (this.props.env[name] || [])[0];
    return primary || DEFAULTS[name].hi || hi || 0;
  }

  get lo() {
    let { lo } = this.state;
    let { name } = this.props;
    let primary = (this.props.env[name] || [])[0];
    return primary || DEFAULTS[name].lo || lo || 0;
  }

  render() {
    let { name } = this.props;

    return <RangeSlider
      onChange={this.onChange}
      onRelease={this.onRelease}
      labelStepSize={RANGE[name].hi}
      min={RANGE[name].lo}
      max={RANGE[name].hi}
      value={[this.lo, this.hi]} />;
  }
}
