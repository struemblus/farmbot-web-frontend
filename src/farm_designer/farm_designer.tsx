import * as React from "react";
import { connect } from "react-redux";
import { Everything } from "../interfaces";
import { success } from "../ui";

@connect((state: Everything) => state)
export class FarmDesigner extends React.Component<Everything, {}> {
  componentDidMount() {
    success("Subscribe to the FarmBot.io mailing list for news and updates.",
      "Work in Progress");
  }

  render() {
    return (
      <div className="farm-designer">
        Designer
      </div>
    );
  }
}

