import * as React from "react";
import { ListAndFormProps, ToolFormState, Tool } from "../interfaces";
import {
  destroyTool,
  addTool,
  stopEditingTools,
  updateTool,
  saveTools
} from "../actions";
import { t } from "i18next";
import {
  Widget,
  WidgetBody,
  WidgetHeader,
  BlurableInput,
  error
} from "../../ui";
import * as _ from "lodash";

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
      let index = e.currentTarget.getAttribute("data-index") || "";
      let currentTool = this.state.tools.filter((tool, idx) => {
        return idx === parseInt(index || "");
      }) as Partial<Tool>;
      currentTool.name = e.currentTarget.value;
    }
  }

  removeTool = (e: React.FormEvent<HTMLButtonElement>) => {
    if (this.state.tools) {
      let index = e.currentTarget.getAttribute("data-index") || "";
      let newToolList = this.state.tools.filter((tool, idx) => {
        return idx !== parseInt(index || "");
      });
      this.setState({ tools: newToolList });
    } else {
      error("Could not remove tool...", "Error");
      throw new Error("Could not find index of tool for removal.");
    }
  }

  addTool = (e: React.FormEvent<HTMLButtonElement>) => {
    if (this.state.tools && this.state.newToolName) {
      let newToolList = this.state.tools.concat({
        name: this.state.newToolName
      });
      this.setState({ tools: newToolList, newToolName: "" });
    } else {
      error("Tools need a name.", "Error");
      throw new Error("Tools require a name for saving.");
    }
  }

  saveAll = () => {
    this.props.dispatch(saveTools(this.props.all.tools.all));
  }

  stopEdit = () => {
    this.props.dispatch(stopEditingTools());
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
          onClick={this.stopEdit}>
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
              return <tr key={index}>
                <td>
                  <input
                    data-index={(index.toString() || "Error no index")}
                    value={tool.name || "Error getting Name"}
                    onChange={this.setExistingToolName}
                  />
                </td>
                <td>
                  <button
                    className="button-like red"
                    data-index={(index.toString() || "Error no index")}
                    onClick={this.removeTool}>
                    <i className="fa fa-times"></i>
                  </button>
                </td>
              </tr>;
            })}
            <tr>
              <td>
                <input
                  value={this.state.newToolName}
                  onChange={this.setNewToolName}
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
