import * as React from "react";
import { ListAndFormProps } from "../interfaces";
import { Widget, WidgetBody, WidgetHeader } from "../../ui";
import { startEditing, destroyTool, addTool, stopEditing } from "../actions";
import * as _ from "lodash";
import { BlurableInput } from "../../blurable_input";
import { t } from "i18next";

export class ToolForm extends React.Component<ListAndFormProps, {}> {
    constructor() {
        super();
        this.set = this.set.bind(this);
    }

    set(e: React.SyntheticEvent<HTMLInputElement>) {
        // update dirty state
    }

    render() {
        let edit = () => { this.props.dispatch(startEditing()); };
        let stopEdit = () => { this.props.dispatch(stopEditing()); };
        let { set } = this;
        let { dispatch } = this.props;
        let { tool_slots, tools } = this.props.all;
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
                        {t("UNDO")}
                    </button>
                </WidgetHeader>
                <WidgetBody>
                    <table>
                        <thead>
                            <tr>
                                <th>TOOL NAME</th>
                                <th>SLOT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tools.map(tool => {
                                let { id, name } = tool;
                                return <tr key={name}>
                                    <td>
                                        <BlurableInput
                                            value={name}
                                            onCommit={set}
                                            />
                                    </td>
                                    <td>
                                        <div className="select-wrapper">
                                            <select>
                                                {tool_slots.map(slot => {
                                                    return <option key={
                                                        slot.id
                                                    }>
                                                        {slot.id}
                                                    </option>;
                                                })}
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className={`button-like 
                                                widget-control red`}
                                            onClick={() => {
                                                dispatch(destroyTool(id));
                                            } }>
                                            X
                                        </button>
                                    </td>
                                </tr>;
                            })}
                            <tr>
                                <td>
                                    <BlurableInput
                                        value={name}
                                        onCommit={set}
                                        />
                                </td>
                                <td>
                                    <div className="select-wrapper">
                                        <select>
                                            {tool_slots.map(slot => {
                                                return <option key={
                                                    slot.id
                                                }>
                                                    {slot.id}
                                                </option>;
                                            })}
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <button
                                        className={`button-like 
                                                widget-control green`}
                                        onClick={() => {
                                            dispatch(addTool({}));
                                        } }>
                                        +
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
