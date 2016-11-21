import * as React from "react";
import { ListAndFormProps, ToolBayFormState } from "../interfaces";
import { Widget, WidgetBody, WidgetHeader } from "../../ui";
import { BlurableInput } from "../../blurable_input";
import { saveToolBays, destroySlot, addSlot } from "../actions";
import { t } from "i18next";

export class ToolBayForm extends React.Component<ListAndFormProps,
    ToolBayFormState> {
    constructor() {
        super();
        this.set = this.set.bind(this);
        this.update = this.update.bind(this);
        this.add = this.add.bind(this);
        this.state = { x: 0, y: 0, z: 0, name: "tool" };
    }

    set(e: React.SyntheticEvent<HTMLInputElement>) {
        let { name, value } = e.currentTarget;
        this.setState({ [name]: value });

    }

    update(e: React.SyntheticEvent<HTMLInputElement>) {
        // update dirty state
        // console.log(e.currentTarget.name.split("-"));
    }

    add(e: React.SyntheticEvent<HTMLInputElement>) {
        this.props.dispatch(addSlot(this.state));
    }

    render() {
        let { set, update } = this;
        let { dispatch } = this.props;
        let { tool_bays, tool_slots, tools } = this.props.all;
        let slotNum = 0;
        return <div>
            {tool_bays.map((bay, i = 0) => {
                let { name } = bay;
                i++;
                return <Widget key={name}>
                    <WidgetHeader
                        helpText="Bays are for Tools"
                        title={name}>
                        <button
                            className="green button-like widget-control"
                            onClick={dispatch(saveToolBays)}>
                            {t("SAVE")}
                        </button>
                    </WidgetHeader>
                    <WidgetBody>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label>TOOLBAY NAME</label>
                                    </td>
                                    <td>
                                        <BlurableInput
                                            value={name}
                                            onCommit={set}
                                            />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <thead>
                                <tr>
                                    <th>SLOT</th>
                                    <th>X</th>
                                    <th>Y</th>
                                    <th>Z</th>
                                    <th colSpan={4}>TOOL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tool_slots.map(item => {
                                    let { id, tool_bay_id, x, y, z } = item;
                                    slotNum++;
                                    return <tr key={slotNum}>
                                        <td>
                                            {slotNum}
                                        </td>
                                        <td>
                                            <BlurableInput
                                                value={String(x)}
                                                name={`${id}-x`}
                                                onCommit={update}
                                                />
                                        </td>
                                        <td>
                                            <BlurableInput
                                                value={String(y)}
                                                name={`${id}-y`}
                                                onCommit={update}
                                                />
                                        </td>
                                        <td>
                                            <BlurableInput
                                                value={String(z)}
                                                name={`${id}-z`}
                                                onCommit={update}
                                                />
                                        </td>
                                        <td colSpan={4}>
                                            <div className="select-wrapper">
                                                <select>
                                                    {tools.map(tool => {
                                                        return <option key={
                                                            tool.id
                                                        }>
                                                            {tool.name}
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
                                                    dispatch(destroySlot(id));
                                                } }>
                                                X
                                            </button>
                                        </td>
                                    </tr>;
                                })}
                                <tr>
                                    <td>
                                        {slotNum + 1}
                                    </td>
                                    <td>
                                        <BlurableInput
                                            value={String(this.state.x)}
                                            type="number"
                                            name="x"
                                            onCommit={set}
                                            />
                                    </td>
                                    <td>
                                        <BlurableInput
                                            value={String(this.state.y)}
                                            type="number"
                                            name="y"
                                            onCommit={set}
                                            />
                                    </td>
                                    <td>
                                        <BlurableInput
                                            value={String(this.state.z)}
                                            type="number"
                                            name="z"
                                            onCommit={set}
                                            />
                                    </td>
                                    <td colSpan={4}>
                                        <div className="select-wrapper">
                                            <select>
                                                {tools.map(tool => {
                                                    return <option key={
                                                        tool.id
                                                    }>
                                                        {tool.name}
                                                    </option>;
                                                })}
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className={`button-like 
                                                    widget-control green`}
                                            onClick={this.add.bind(this)}>
                                            +
                                            </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </WidgetBody>
                </Widget>;
            })}
        </div>;
    }
};
