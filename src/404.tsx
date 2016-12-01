import * as React from "react";
import { Everything } from "./interfaces";

export class FourOhFour extends React.Component<Everything, {}> {
    render() {
        return (
            <div className="404">
                <div className="all-content-wrapper">
                    <h1>Page Not Found.</h1>
                </div>
            </div>
        );
    }
}
