import * as React from "react";
var Slider = require("rc-slider") as (props: TodoFixThis) => JSX.Element;
require("rc-slider/assets/index.css");

interface TodoFixThis {
    onChange?: (val: number) => void;
    min?: number;
    max?: number;
    onAfterChange?: (val: number) => void;
    range?: boolean;
    allowCross?: boolean;
    defaultValue?: number[];
    value?: number | undefined;
}

/** Hue, Saturation, Value structure. */
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
    H: { hi: 0, lo: 179 },
    S: { hi: 0, lo: 255 },
    V: { hi: 0, lo: 255 }
};

/** Default HSV if none found on bot. */
const DEFAULTS: HSV<HiLo> = {
    H: { hi: 10, lo: 20 },
    S: { hi: 30, lo: 40 },
    V: { hi: 50, lo: 60 }
};

interface EnvSliderProps {
    name: keyof HSV<{}>;
    // value?: number | undefined;
}

export function HsvSlider(props: EnvSliderProps) {
    let { name } = props;
    return <Slider
        min={RANGE[name].lo}
        max={RANGE[name].hi}
        range={true}
        allowCross={true}
        defaultValue={[DEFAULTS[name].lo, DEFAULTS[name].hi]} />;
}
