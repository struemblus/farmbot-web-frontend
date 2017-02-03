import * as React from "react";
import { RangeSlider } from "@blueprintjs/core";

/** Hue, Saturation, Value map. */
interface HSV<T> {
    H: T;
    S: T;
    V: T;
}

/** A simple range object. */
interface HiLo {
    hi: number;
    lo: number;
}

/** Max HSV allowed by farmbot weed detector. */
const RANGE: HSV<HiLo> = {
    H: { lo: 0, hi: 179 },
    S: { lo: 0, hi: 255 },
    V: { lo: 0, hi: 255 }
};

/** Default HSV if none found on bot. */
const DEFAULTS: HSV<HiLo> = {
    H: { lo: 20, hi: 60 },
    S: { lo: 60, hi: 120 },
    V: { lo: 90, hi: 150 }
};

interface EnvSliderProps {
    name: keyof HSV<{}>;
    onChange?: (key: string, val: number) => void;
}

interface EnvSliderState {
    hi: number | undefined;
    lo: number | undefined;
}
export class HsvSlider extends React.Component<EnvSliderProps, Partial<EnvSliderState>> {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.state = {};
    }

    onChange(range: [number, number]) {
        this.setState({
            hi: range[1],
            lo: range[0]
        });
    }

    get hi() {
        let { hi } = this.state;
        let { name } = this.props;
        return (hi === undefined) ? DEFAULTS[name].hi : hi;
    }

    get lo() {
        let { lo } = this.state;
        let { name } = this.props;
        return (lo === undefined) ? DEFAULTS[name].lo : lo;
    }

    render() {
        let { name } = this.props;

        return <RangeSlider
            onChange={this.onChange}
            labelStepSize={RANGE[name].hi}
            min={RANGE[name].lo}
            max={RANGE[name].hi}
            value={[this.lo, this.hi]} />;
    }
}
