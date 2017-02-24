import * as React from "react";
import { ListAndFormProps, ToolFormState } from "../interfaces";
import { t } from "i18next";
import { Widget, WidgetBody, WidgetHeader, BlurableInput } from "../../ui";
import { toggleEditingTools, saveAllTools } from "../actions";

export class ToolForm extends React.Component<ListAndFormProps,
  Partial<ToolFormState>> {
  constructor() {
    super();
    this.state = { tools: [], newToolName: "" };
  }

  componentDidMount() {
    this.setState({ tools: this.props.all.tools.all });
  }

  setNewToolName = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ newToolName: e.currentTarget.value });
  }

  setExistingToolName = (e: React.FormEvent<HTMLInputElement>) => {
    if (this.state.tools) {
      let toolStateCopy = this.state.tools.slice(0);
      let index = e.currentTarget.id || "NO ID FOUND";
      let modifiedTool = toolStateCopy[parseInt(index)];
      modifiedTool.name = e.currentTarget.value;
      modifiedTool.dirty = true;
      this.setState({ tools: toolStateCopy });
    }
  }

  removeTool = (e: React.FormEvent<HTMLButtonElement>) => {
    if (this.state.tools) {
      let toolStateCopy = this.state.tools.slice(0);
      let index = e.currentTarget.id || "NO ID FOUND";
      let modifiedTool = toolStateCopy[parseInt(index)];
      modifiedTool.isNew = false;
      modifiedTool.isDeleted = true;
      this.setState({ tools: toolStateCopy });
    }
  }

  addTool = (e: React.FormEvent<HTMLButtonElement>) => {
    if (this.state.tools && this.state.newToolName) {
      let newToolList = this.state.tools.concat({
        name: this.state.newToolName, isNew: true
      });
      this.setState({ tools: newToolList, newToolName: "" });
    }
  }

  saveAll = () => {
    if (this.state.tools) {
      this.props.dispatch(saveAllTools(this.state.tools));
    }
  }

  toggleEdit = () => {
    this.props.dispatch(toggleEditingTools());
  }

  render() {
    return <Widget>
      <WidgetHeader
        helpText={t(`This is a list of all your FarmBot Tools.
          Click the Edit button to add, edit, or delete tools.`)}
        title="TOOLS">
        <button
          className="green button-like"
          onClick={() => { this.saveAll(); }}>
          {t("SAVE")}
          {this.props.all.tools.dirty && ("*")}
        </button>
        <button
          className="gray button-like"
          onClick={this.toggleEdit}>
          {t("BACK")}
        </button>
      </WidgetHeader>
      <WidgetBody>
        <table>
          <thead>
            <tr>
              <th>{t("TOOL NAME")}</th>
            </tr>
          </thead>
          <tbody>
            {(this.state.tools || []).map((tool, index) => {
              let isDeleted = tool.isDeleted || false;
              return <tr key={index} className={"is-deleted-" + isDeleted}>
                <td>
                  <BlurableInput
                    id={(index.toString() || "Error no index")}
                    value={tool.name || "Error getting Name"}
                    onCommit={this.setExistingToolName}
                  />
                </td>
                <td>
                  <button
                    className="button-like red"
                    id={(index.toString() || "Error no index")}
                    onClick={this.removeTool}>
                    <i className="fa fa-times"></i>
                  </button>
                </td>
              </tr>;
            })}
            <tr>
              <td>
                <BlurableInput
                  value={this.state.newToolName || ""}
                  onCommit={this.setNewToolName}
                  commitOnEnter={this.addTool}
                  type="text"
                />
              </td>
              <td>
                <button
                  className="button-like green"
                  onClick={this.addTool}>
                  <i className="fa fa-plus"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </WidgetBody>
    </Widget>;
  }
};
