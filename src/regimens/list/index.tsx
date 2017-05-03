import * as React from "react";
import { RegimenListItem } from "./regimen_list_item";
import { AddRegimen } from "./add_button";
import { Row, Col, ToolTip } from "../../ui/index";
import { RegimensListProps } from "../interfaces";
import { sortResourcesById } from "../../util";
import { ToolTips } from "../../constants";
import { t } from "i18next";

export class RegimensList extends React.Component<RegimensListProps, {}> {
  rows = () => {
    return <Col xs={12}>
      {sortResourcesById(this.props.regimens)
        .map((regimen, index) => {
          return <RegimenListItem index={index}
            key={index}
            regimen={regimen}
            dispatch={this.props.dispatch} />;
        })}
    </Col>
  }

  render() {
    return <div className="regimen-list">
      <h3>
        <i>{t("Regimens")}</i>
      </h3>
      <ToolTip helpText={ToolTips.REGIMEN_LIST} />
        <AddRegimen dispatch={this.props.dispatch} />
        <Row>{this.rows()}</Row>
    </div>;
  }
}
