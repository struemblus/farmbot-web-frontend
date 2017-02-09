import * as React from "react";
import { ChromePicker } from "react-color";

interface State {
}

interface Props {
    h: [number, number];
    s: [number, number];
}

/** Wrapper class around `react-color`'s `<ChromePicker />`. Add an extra white
 * box feature for showing user weed detection settings.
 */
export class FbChromePicker extends React.Component<Props, State> {
    BASE_CSS: React.CSSProperties = {
        position: "absolute",
        border: "2px solid white",
        boxShadow: "2px 0 2px -2px rgba(0, 0, 0, 0.4)"
    };

    constructor() {
        super();
        this.state = {};
        this.boxCss = this.boxCss.bind(this);
        this.color = this.color.bind(this);
    }

    boxCss(): React.CSSProperties {
        let l = ((this.props.h[0] * 2) / 360) * 100;
        let w = (((this.props.h[1] * 2) / 360) * 100) - l;
        let t = Math.round((this.props.s[0] / 255) * 100);
        let h = Math.abs(t - Math.round((this.props.s[1] / 255) * 100));

        let width = `${Math.round(w)}%`;
        let left = `${Math.round(l)}%`;
        let height = `${Math.round(h)}%`;
        let top = `${Math.round(t)}%`;
        return { ...this.BASE_CSS, width, height, top, left };
    }

    color() {
        let {h, s} = this.props;
        return {
            h: ((h[1] * 2 + h[0] * 2) / 2),
            s: ((s[0] + s[1]) / 2),
            l: 0
        };
    }

    render() {
        let {h, s} = this.props;
        return <div style={{ position: "relative" }}>
            <ChromePicker color={this.color()} />
            <div style={this.boxCss()}>
            </div>
        </div>;
    }
}
