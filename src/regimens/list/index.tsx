import * as React from "react";
import { RegimenListItem } from "./regimen_list_item";
import { AddRegimen } from "./add_button";
import { Widget, WidgetHeader, WidgetBody, Row, Col } from "../../ui/index";
import { RegimensListProps } from "../interfaces";

export class RegimensList extends React.Component<RegimensListProps, {}> {
  rows = () => {
    <Col xs={12}>
      {this
        .props
        .calendar
        .map(function (props, inx) {
          return <div>
            <h1>(FIX) Day {props.day} </h1>
            {props.items.map(function (x, y) {
              return <RegimenListItem {...x} key={y} />
            })}
          </div>
        })}
    </Col>
  }
  render() {
    return <Widget className="regimen-list-widget">
      <WidgetHeader title="Regimens"
        helpText={`This is a list of all of your regimens.
                   Click one to begin editing it.`}>
        <AddRegimen dispatch={this.props.dispatch} />
      </WidgetHeader>
      <WidgetBody>
        <Row>
          {this.rows()}
        </Row>
      </WidgetBody>

      <AddRegimen className="plus-button"
        dispatch={this.props.dispatch}>
        <i className="fa fa-plus"></i>
      </AddRegimen>

    </Widget>;
  }
}
