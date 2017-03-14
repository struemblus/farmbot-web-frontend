import * as React from "react";
import { ToolsState, Props } from "./interfaces";
import { Col, Row } from "../ui";
import { ToolBayList, ToolBayForm, ToolList, ToolForm } from "./components";
import { connect } from "react-redux";
import { mapStateToProps } from "./state_to_props";

@connect(mapStateToProps)
export class Tools extends React.Component<Props, ToolsState> {
  render() {
    let isEditingBays = this.props.editorMode;
    let isEditingTools = this.props.isEditingTools;
    return <div className="all-content-wrapper tools">
      <Row>
        <Col sm={7}>
          {!isEditingBays && (<ToolBayList {...this.props} />)}
          {isEditingBays && (<ToolBayForm {...this.props} />)}
        </Col>
        <Col sm={5}>
          {!isEditingTools && (<ToolList {...this.props} />)}
          {isEditingTools && (<ToolForm {...this.props} />)}
        </Col>
      </Row>
    </div>;
  }
}
