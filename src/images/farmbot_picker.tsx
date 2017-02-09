import * as React from "react";
import { Saturation } from 'react-color/lib/components/common';

interface State {
}

interface Props {
    h: [number, number];
    s: [number, number];
    v: [number, number];
    hsv: { h: number, s: number, v: number };
    hsl: { h: number, s: number, l: number };
}

/** Wrapper class around `react-color`'s `<Saturation />`. Add an extra white
 * box feature for showing user weed detection settings.
 */
export class FarmbotPicker extends React.Component<Props, State> {
    BASE_CSS: React.CSSProperties = {
        position: "absolute",
        border: "2px solid white",
        boxShadow: "2px 0 2px -2px rgba(0, 0, 0, 0.4)"
    };

    constructor() {
        super();
        this.state = {};
        this.SaturationCSS = this.SaturationCSS.bind(this);
        this.boxCss = this.boxCss.bind(this);
    }

    SaturationCSS(): React.CSSProperties {
        let position = "relative";
        let width = "100%";
        let paddingBottom = '55%';
        let overflow = 'hidden'
        return { position, width, paddingBottom, overflow };
    }
    
    boxCss(): React.CSSProperties {
        let l = ((this.props.s[0] / 255) * 100);
        let w = ((this.props.s[1] / 255) * 100) - l;
        let t = Math.abs(100 - (this.props.v[1] / 255) * 100);
        let h = Math.abs(t - (100 - (this.props.v[0] / 255) * 100));


        let width = `${w}%`;
        let left = `${l}%`;
        let height = `${h}%`;
        let top = `${t}%`;
        return { ...this.BASE_CSS, width, height, top, left };
    }

    render() {
        return <div style={this.SaturationCSS()}>
            <Saturation {...this.props} />
            <div style={this.boxCss()}>
            </div>
        </div>;
    }
}
