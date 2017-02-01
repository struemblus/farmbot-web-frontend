import { Image } from "./interfaces";
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

    get next() {
        return this.props.images[this.state.currentInx + 1];
    }

    get prev() {
        return this.props.images[this.state.currentInx - 1];
    }

    up() {
        if (this.next) {
            let num = this.state.currentInx + 1;
            this.setState({ currentInx: _.min([this.props.images.length - 1, num]) });
        }
    }

    down() {
        if (this.prev) {
            let num = this.state.currentInx - 1;
            this.setState({ currentInx: _.max([0, num]) });
        }
    }

    render() {
        return <div className="image-flipper">
            <button onClick={this.up}>Next></button>
            <button onClick={this.down} className="image-flipper-left">Prev</button>
            {this.image()}
        </div>;
    }
}
