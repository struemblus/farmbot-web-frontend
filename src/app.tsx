import * as React from "react";
import { NavBar } from "./nav";
import { Everything } from "./interfaces";
import { init } from "./ui";

init();
// let script = document.createElement("script");
// script.src = "http://YOUR-IP/target/target-script-min.js#anonymous";
// document.body.appendChild(script);
export default class App extends React.Component<Everything, {}> {
  render() {
    return (
      <div className="app">
        <NavBar { ...this.props } />
        {this.props.children}
      </div>
    );
  }
}
