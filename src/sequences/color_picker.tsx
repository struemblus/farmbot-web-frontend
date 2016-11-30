import * as React from "react";
import { Saucer } from "../ui";
import { Color } from "../interfaces";
import { ColorPickerProps } from "./interfaces";
import { colors } from "../util";

export class ColorPicker extends React.Component<ColorPickerProps, {}> {
    render() {
        let actual = this.props.current;
        let cb = this.props.onChange || function () { };

        function renderColors(color: Color, key: number) {
            let isActive = color === actual;
            return <div key={key} onClick={() => cb(color)} >
                <Saucer color={color} active={isActive} />
            </div>;
        }

        return <div className="colorpicker">
            <Saucer color={this.props.current} />
            <div className="colorpicker-body">
                {colors.map(renderColors)}
            </div>
        </div>;
    };
}
