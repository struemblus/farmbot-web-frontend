import * as React from "react";
import { connect } from "react-redux";
import { Page, Col, Row } from "../ui/index";
import { WeedDetector } from "../images/index";
import { Farmware } from "./farmware_panel";
import { State, Props } from "./interfaces";
import { mapStateToProps } from "./state_to_props";

@connect(mapStateToProps)
export class FarmwarePage extends React.Component<Props, State> {
  render() {
    return <Page className="farmware">
      <Row>
        <Col xs={12} sm={4}>
          <Farmware
            bot={this.props.bot}
          />
        </Col>
        <Col xs={12} sm={8}>
          <WeedDetector
            bot={this.props.bot}
            dispatch={this.props.dispatch}
            images={this.props.images}
          />
        </Col>
      </Row>
    </Page>;
  }
};
