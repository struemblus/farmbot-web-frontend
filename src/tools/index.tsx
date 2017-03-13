import * as React from "react";
import { Everything } from "../interfaces";
import { ToolsState } from "./interfaces";
import { Col } from "../ui";
import { ToolBayList, ToolBayForm, ToolList, ToolForm } from "./components";
import { connect } from "react-redux";
import { mapStateToProps, Props } from "./state_to_props";

@connect(mapStateToProps)
export class Tools extends React.Component<Props, ToolsState> {
  render() {
    console.log(this.props)
    let isEditingBays = this.props.editorMode;
    let isEditingTools = this.props.isEditingTools;
    return <div className="all-content-wrapper tools">
      <Col sm={7}>
        {!isEditingBays && (
          <ToolBayList {...this.props} />
        )}
        {isEditingBays && (
          <ToolBayForm
            all={this.props.tools}
            dispatch={this.props.dispatch}
          />
        )}
      </Col>
      <Col sm={5}>
        {!isEditingTools && (
          <ToolList {...this.props} />
        )}
        {/*{isEditingTools && (
          <ToolForm
            all={this.props.tools}
            dispatch={this.props.dispatch}
          />
        )}*/}
      </Col>
    </div>;
  }
}
