import * as React from "react";
import { Everything } from "./interfaces";
import { noop } from "lodash";

export class Wrapper extends React.Component<any, any> {
  render() {
    return <div> {this.props.children} </div>;
  }
}

/** Factory function for empty state object. */
export function fakeState(dispatcher: Function = noop): Everything {
  return JSON.parse("BRB") as Everything;
}
