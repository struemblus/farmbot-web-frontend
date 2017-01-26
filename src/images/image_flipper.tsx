import { Image } from "./interfaces";
import { withinBounds } from "../util";
import * as React from "react";

export interface ImageFlipperProps {
    images: Image[];
}

export interface ImageFlipperState {
    currentInx: number;
}

export class ImageFlipper extends React.Component<ImageFlipperProps, Partial<ImageFlipperState>> {
    constructor() {
        super();
        this.state = { currentInx: 0 };
        this.down = this.down.bind(this);
        this.up = this.up.bind(this);
        this.image = this.image.bind(this);
    }

    image() {
        let i = this.props.images[this.state.currentInx || 0];
        if (i) {
            return <div className="row" >
                <div className="col-sm-12">
                    {
                        (i.attachment_processed_at) ?
                            <img src={i.attachment_url} /> :
                            <p> Image {i.id} is still processing. </p>
                    }
                </div>
            </div>;
        } else {
            return <p> Please snap some photos in the sequence editor first.</p>;
        }
    }

    up() {
        let next = this.state.currentInx + 1;
        if (withinBounds(this.props.images, next)) {
            this.setState({ currentInx: next });
        }
    }

    down() {
        let next = this.state.currentInx - 1;
        if (withinBounds(this.props.images, next)) {
            this.setState({ currentInx: next });
        }
    }

    render() {
        let upOK = withinBounds(this.props.images, this.state.currentInx + 1);
        let downOK = withinBounds(this.props.images, this.state.currentInx - 1);
        return <div>
            <button onClick={this.down} disabled={downOK}>Prev</button>
            <button onClick={this.up} disabled={upOK}>Next</button>
            {this.image()}
        </div>;
    }
}
