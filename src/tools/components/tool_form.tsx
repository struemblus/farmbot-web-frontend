import * as React from "react";
import { ListAndFormProps, ToolFormState } from "../interfaces";
import { startEditing, destroyTool, addTool, stopEditing } from "../actions";
import { t } from "i18next";
import {
    Widget,
    WidgetBody,
    WidgetHeader,
    BlurableInput
} from "../../ui";

export class ToolForm extends React.Component<ListAndFormProps, ToolFormState> {
    constructor() {
        super();
        this.add = this.add.bind(this);
        this.set = this.set.bind(this);
        this.updateToolName = this.updateToolName.bind(this);
        this.state = { name: "", id: 0 };
    }

    add() {
        this.props.dispatch(addTool(this.state));
        this.setState({ name: "" });
    }

    updateToolName(e: React.FormEvent<HTMLInputElement>) {
        this.setState({ name: e.currentTarget.value });
    }

    set(e: React.FormEvent<HTMLInputElement>) {
        this.setState({ name: e.currentTarget.value });
    }

    render() {
        let { set, add, updateToolName } = this;
        let { dispatch } = this.props;
        let { tools } = this.props.all;
        let edit = () => { dispatch(startEditing()); };
        let stopEdit = () => { dispatch(stopEditing()); };
        return <div>
            <Widget>
                <WidgetHeader
                    helpText="Tools are for tooling."
                    title="TOOLS">
                    <button
                        className="green button-like widget-control"
                        onClick={edit}>
                        {t("SAVE")}
                    </button>
                    <button
                        className="gray button-like widget-control"
                        onClick={stopEdit}>
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
                            {tools.map((tool, index) => {
                                index++;
                                let { name, id } = tool;
                                return <tr key={index}>
                                    <td>
                                        <BlurableInput
                                            value={name || "Error getting Name"}
                                            onCommit={updateToolName}
                                            name={index.toString()}
                                            />
                                    </td>
                                    <td>
                                        <button
                                            className={`button-like 
                                                widget-control red`}
                                            onClick={() => {
                                                dispatch(destroyTool(id));
                                            } }>
                                            <i className="fa fa-times"></i>
                                        </button>
                                    </td>
                                </tr>;
                            })}
                            <tr>
                                <td>
                                    <input
                                        value={this.state.name}
                                        onChange={set}
                                        name="name"
                                        />
                                </td>
                                <td>
                                    <button
                                        className={`button-like 
                                                widget-control green`}
                                        onClick={() => { dispatch(add); } }>
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </WidgetBody>
            </Widget>
        </div>;
    }
};
