import * as React from "react";
import { Saucer } from "../ui";
import { Color } from "../interfaces";
import { } from "../interfaces";
import { ColorPickerState, ColorPickerProps } from "./interfaces";
import { colors } from "../util";

export class ColorPicker extends React.Component<ColorPickerProps,
    ColorPickerState> {
    constructor(props: ColorPickerProps) {
        super(props);
        this.state = { isHovered: false };
    }

    /** The output of this function is what the user will see when the
      color circle is hovered over. */
    isHovered() {
        let actual = this.props.current;

        let cb = this.props.onChange || function () { };

        function littleCircle(color: Color, key: number) {

            let style: {
                border: string;
                margin: string;
            } = {
                    margin: "4px",
                    border: ""
                };

            if (color === actual) { style.border = "3px solid #666"; }

            function colorChange() { cb(color); }

            return <div key={key} onClick={colorChange} >
                <Saucer color={color} style={style} />
            </div>;
        }

        return <div className="colorpicker-text">
            {colors.map(littleCircle)}
        </div>;
    }

    /** This is what the user sees when the circle is not hovered over. */
    notHovered() { return <div></div>; }

    render() {
        return <Saucer color={this.props.current} />;
    };
}
