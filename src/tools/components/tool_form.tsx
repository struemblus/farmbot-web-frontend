import * as React from "react";
import { ToolFormState, ToolFormProps } from "../interfaces";
import { t } from "i18next";
import { Row, Col, Widget, WidgetBody, WidgetHeader, BlurableInput } from "../../ui";
import {
  toggleEditingTools,
  addTool,
  destroyTool,
  updateTool,
  saveTools
} from "../actions";
import { TaggedTool } from "../../resources/tagged_resources";

export class ToolForm extends React.Component<ToolFormProps, ToolFormState> {
  setNewToolName = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ newToolName: e.currentTarget.value });
  }

  update = (e: React.FormEvent<HTMLInputElement>) => {
    let { id, value } = e.currentTarget;
    this.props.dispatch(updateTool(parseInt(id), value));
  }

  add = (e: React.FormEvent<HTMLButtonElement>) => {
    this.props.dispatch(addTool(this.state.newToolName || ""));
    this.setState({ newToolName: "" });
  }

  destroy = (uuid: string) => {
    this.props.dispatch(destroyTool(uuid));
  }

  render() {
    let uuid = "TODO: FIX ME";
    let toggle = () => this.props.dispatch(toggleEditingTools());
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
          onClick={() => this.props.dispatch(saveTools(uuid))}>
          {t("Save")}
          {this.props.dirtyTools && ("*")}
        </button>
      </WidgetHeader>
      <WidgetBody>
        <Row>
          <Col xs={12}>
            <label>{t("Tool Name")}</label>
          </Col>
        </Row>
        {this.props.getSortedTools().map((tool: TaggedTool) => {
          return <Row key={tool.body.id}>
            <Col xs={10}>
              <BlurableInput
                id={(tool.body.id || "Error getting ID").toString()}
                value={tool.body.name || "Error getting Name"}
                onCommit={this.update}
              />
            </Col>
            <Col xs={2}>
              <button
                className="button-like red"
                onClick={() => this.destroy(uuid)}>
                <i className="fa fa-times"></i>
              </button>
            </Col>
          </Row>;
        })}
        <Row>
          <Col xs={10}>
            <BlurableInput
              value={this.state.newToolName || ""}
              onCommit={this.setNewToolName}
              type="text"
            />
          </Col>
          <Col xs={2}>
            <button
              className="button-like green"
              onClick={this.add}>
              <i className="fa fa-plus"></i>
            </button>
          </Col>
        </Row>
      </WidgetBody>
    </Widget>;
  }
};
