import * as React from "react";
import { ToolFormProps } from "../interfaces";
import { t } from "i18next";
import { Row, Col, Widget, WidgetBody, WidgetHeader, BlurableInput } from "../../ui";
import { TaggedTool } from "../../resources/tagged_resources";
import { edit } from "../../api/crud";

export class ToolForm extends React.Component<ToolFormProps, {}> {
  render() {
    let toggle = () => this.props.toggle();
    let { dispatch, getSortedTools } = this.props;
    return <Widget>
      <WidgetHeader
        helpText={t(`This is a list of all your FarmBot Tools.
          Click the Edit button to add, edit, or delete tools.`)}
        title="Tools">
        <button
          className="gray button-like"
          onClick={toggle}>
          {t("Back")}
        </button>
        <button
          className="green button-like"
          onClick={() => {/** save */ }}>
          {t("Save")}
        </button>
      </WidgetHeader>
      <WidgetBody>
        <Row>
          <Col xs={12}>
            <label>{t("Tool Name")}</label>
          </Col>
        </Row>
        {getSortedTools().map((tool: TaggedTool) => {
          return <Row key={tool.body.id}>
            <Col xs={10}>
              <BlurableInput
                id={(tool.body.id || "Error getting ID").toString()}
                value={tool.body.name || "Error getting Name"}
                onCommit={(e) => {
                  dispatch(edit(tool, { name: e.currentTarget.value }));
                }}
              />
            </Col>
            <Col xs={2}>
              <button
                className="button-like red"
                onClick={() => { /** destroy */ }}>
                <i className="fa fa-times"></i>
              </button>
            </Col>
          </Row>;
        })}
      </WidgetBody>
    </Widget>;
  }
};
