import * as React from "react";
import { SequencesList } from "./sequences_list";
import { StepButtonCluster } from "./step_button_cluster";
import { SequenceEditorMiddle } from "./sequence_editor_middle";
import { MobileSequencesNav } from "./mobile_nav";
import { connect } from "react-redux";
import { isMobile } from "../util";
import { Page, Col } from "../ui/index";
import { Props } from "./interfaces";
import { mapStateToProps } from "./state_to_props";

@connect(mapStateToProps)
export class Sequences extends React.Component<Props, {}> {
  render() {
    return <Page className="sequences">
      <Col xs={4} md={3}>
        <StepButtonCluster
          dispatch={this.props.dispatch}
        />
      </Col>
      <Col xs={8} md={6}>
        <SequenceEditorMiddle
          dispatch={this.props.dispatch}
          sequences={this.props.sequences}
          tools={this.props.tools}
        />
      </Col>
      {isMobile() && (
        <MobileSequencesNav
          param={this.props.param}
        />
      )}
      <Col xs={12} md={3}>
        <SequencesList
          dispatch={this.props.dispatch}
          auth={this.props.auth}
          sequences={this.props.sequences}
        />
      </Col>
    </Page>;
  }
};
