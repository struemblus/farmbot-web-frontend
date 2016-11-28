import * as React from "react";
import { ListAndFormProps, ToolFormState } from "../interfaces";
import { Widget, WidgetBody, WidgetHeader, Select } from "../../ui";
import { startEditing, destroyTool, addTool, stopEditing } from "../actions";
import { BlurableInput } from "../../blurable_input";
import { t } from "i18next";

export class ToolForm extends React.Component<ListAndFormProps, ToolFormState> {
    constructor() {
        super();
        this.set = this.set.bind(this);
        this.add = this.add.bind(this);
        this.state = { name: "", slot_id: 0, id: 0 };
    }

    add() {
        this.props.dispatch(addTool(this.state));
    }

    set(e: React.SyntheticEvent<HTMLInputElement>) {
        // update dirty state
    }

    render() {
        let { set, add } = this;
        let { dispatch } = this.props;
        let { tool_slots, tools } = this.props.all;
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
                                        <Select>
                                            {tool_slots.map((slot, i) => {
                                                i++;
                                                return <option key={i}>
                                                    {slot.name}
                                                </option>;
                                            })}
                                        </Select>
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
