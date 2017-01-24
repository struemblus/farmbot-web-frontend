import * as React from "react";

// THANK YOU!
// https://github.com/winkerVSbecks/fermat-point/blob/master/src/handle.jsx
export class DraggableSvgImage extends React.Component<any, any> {

    constructor() {
        super();
        this.hover = this.hover.bind(this);
        this.selectElement = this.selectElement.bind(this);
        this.deSelectElement = this.deSelectElement.bind(this);
        this.state = {
            isDragging: false,
            radius: 5
        };
    }

    hover() {
        this.setState({
            radius: 30
        });
    }

    selectElement(e: React.MouseEvent<SVGElement>) {
        this.setState({
            isDragging: true,
            mouseX: e.pageX,
            mouseY: e.pageY
        });
    }

    deSelectElement() {
        this.setState({
            isDragging: false,
            radius: 5
        });
    }

    drag(e: React.MouseEvent<SVGElement>) {

        if (this.state.isDragging) {
            var idx = this.props.id;
            var deltaX = e.pageX - this.state.mouseX;
            var deltaY = e.pageY - this.state.mouseY;

            this.props.onUpdate(deltaX, deltaY, idx);

            this.setState({
                mouseX: e.pageX,
                mouseY: e.pageY
            });
        }
    }

    render() {
        return (
            <image className="handle"
                id={this.props.id}
                x={this.props.x}
                y={this.props.y}
                href={this.props.href}
                onMouseOver={() => this.hover()}
                onMouseDown={(e) => this.selectElement(e)}
                onMouseMove={(e) => this.drag(e)}
                onMouseUp={() => this.deSelectElement()}
                onMouseLeave={() => this.deSelectElement()} />
        );
    }

};
