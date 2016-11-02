import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Everything } from "./interfaces";

@connect((state: Everything) => state)
export default class Dashboard extends Component<any, any> {
  render() {
    return <div className="dashboard">
        {this.props.children}
      </div>;
  }
}
