import * as React from "react";
import { render } from "react-dom";
import "../npm_addons";

export class Wow extends React.Component<{}, {}> {
    render() {
        return <div>
            <h1>Hey</h1>
        </div>;
    }
}

let el = document.querySelector("#tos_update");

if (el) {
    render(<Wow />, el);
} else {
    throw new Error("You must put a Div on the page with an id of tos_update");
}
