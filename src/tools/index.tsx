import * as React from "react";
import { ToolsState, Props } from "./interfaces";
import { Col, Row, Page } from "../ui";
import { ToolBayList, ToolBayForm, ToolList, ToolForm } from "./components";
import { connect } from "react-redux";
import { mapStateToProps } from "./state_to_props";

@connect(mapStateToProps)
export class Tools extends React.Component<Props, ToolsState> {
  render() {
    let isEditingBays = this.props.editingBays;
    let isEditingTools = this.props.editingTools;
    return <Page className="tools">
      <Row>
        <Col sm={7}>
          {!isEditingBays && <ToolBayList
            dispatch={this.props.dispatch}
            getToolByToolSlotUUID={this.props.getToolByToolSlotUUID}
            toolBays={this.props.toolBays}
            getToolSlots={this.props.getToolSlots}
          />}
          {isEditingBays && <ToolBayForm
            dispatch={this.props.dispatch}
            toolBays={this.props.toolBays}
            getToolSlots={this.props.getToolSlots}
            getChosenToolOption={this.props.getChosenToolOption}
            getToolOptions={this.props.getToolOptions}
          />}
        </Col>
        <Col sm={5}>
          {!isEditingTools && <ToolList
            dispatch={this.props.dispatch}
            getSortedTools={this.props.getSortedTools}
          />}
          {isEditingTools && <ToolForm
            dispatch={this.props.dispatch}
            tools={this.props.tools}
            getSortedTools={this.props.getSortedTools}
          />}
        </Col>
      </Row>
    </Page>;
  }
}
