import * as React from "react";
import { ListAndFormProps } from "../interfaces";
import { Row, Col, Widget, WidgetBody, WidgetHeader } from "../../ui";
import { toggleEditingTools } from "../actions";
import { t } from "i18next";
import { Props } from "../state_to_props";

export class ToolList extends React.Component<Props, {}> {
  render() {
    let toggle = () => { this.props.dispatch(toggleEditingTools()); };
    return <Col>
      <Widget>
        <WidgetHeader
          helpText={t(`This is a list of all your FarmBot Tools.
              Click the Edit button to add, edit, or delete tools.`)}
          title="TOOLS">
          <button
            className="gray button-like"
            onClick={toggle}>
            {t("EDIT")}
          </button>
        </WidgetHeader>
        <WidgetBody>
          <Row>
            <Col xs={6}>{t("TOOL NAME")}</Col>
            <Col xs={6}>{t("STATUS")}</Col>
            {this.props.tools.map((tool, index) => {
              return <div key={index}>
                <Col xs={6}>{tool.name || "Name not found"}</Col>
                <Col xs={6}>{tool.status || "Status not found"}</Col>
              </div>;
            })}
          </Row>
        </WidgetBody>
      </Widget>
    </Col>;
  }
};
