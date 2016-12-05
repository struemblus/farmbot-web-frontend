import * as React from "react";
import { ListAndFormProps, ToolBayFormState } from "../interfaces";
import { Widget, WidgetBody, WidgetHeader, Select } from "../../ui";
import { BlurableInput } from "../../ui";
import {
    saveToolBays,
    destroySlot,
    addSlot,
    updateSlot,
    updateToolBayName,
    stopEditing
} from "../actions";
import { t } from "i18next";

export class ToolBayForm extends React.Component<ListAndFormProps,
    ToolBayFormState> {
    constructor() {
        super();
        this.set = this.set.bind(this);
        this.updateCoordinate = this.updateCoordinate.bind(this);
        this.updateToolBayName = this.updateToolBayName.bind(this);
        this.updateTool = this.updateTool.bind(this);
        this.add = this.add.bind(this);
        this.resetState = this.resetState.bind(this);
        this.state = { x: "0", y: "0", z: "0", name: "", tool_bay_id: 0 };
    }

    resetState() {
        this.setState({ x: "0", y: "0", z: "0", name: "", tool_bay_id: 0 });
    }

    set(e: React.SyntheticEvent<HTMLInputElement> |
        React.SyntheticEvent<HTMLSelectElement>) {
        let { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    }

    updateCoordinate(e: React.SyntheticEvent<HTMLInputElement>) {
        let { id, name, value } = e.currentTarget;
        let data = { slot_id: id, property: name, value: value };
        this.props.dispatch(updateSlot(data));
    }

    updateToolBayName(e: React.SyntheticEvent<HTMLInputElement>) {
        let { id, value } = e.currentTarget;
        this.props.dispatch(updateToolBayName(id, value));
    }

    updateTool(e: React.SyntheticEvent<HTMLSelectElement>) {
        console.log("update tool");
    }

    updateToolSelect(e: React.SyntheticEvent<HTMLSelectElement>) {
        console.log("update tool select");
    }

    add(bay_id: number) {
        let slotState = this.state;
        this.props.dispatch(addSlot({ slotState, bay_id }));
        this.resetState();
    }

    renderTools(slotId: number | undefined) {
        let { tools } = this.props.all;
        let defaultValue = 0;
        let options = tools.map(tool => {
            let { id, name } = tool;
            if (tool.slot_id === slotId) {
                defaultValue = id;
            };
            return <option value={id} key={id}>{name}</option>;
        });
        return <Select onChange={this.updateTool}
            value={defaultValue.toString()}>
            {options}
            <option value="0">---</option>
        </Select>;
    }

    renderSlots() {
        return this.props.all.tool_slots.map((slot, i) => {
            let { x, y, z } = slot;
            let slotId = slot.id;
            i++;
            return <tr key={i}>
                <td>
                    {i}
                </td>
                <td>
                    <BlurableInput
                        type="number"
                        id={(slotId || "").toString()}
                        name="x"
                        value={x.toString()}
                        onCommit={this.updateCoordinate}
                        />
                </td>
                <td>
                    <BlurableInput
                        type="number"
                        id={(slotId || "").toString()}
                        name="y"
                        value={y.toString()}
                        onCommit={this.updateCoordinate}
                        />
                </td>
                <td>
                    <BlurableInput
                        type="number"
                        id={(slotId || "").toString()}
                        name="z"
                        value={z.toString()}
                        onCommit={this.updateCoordinate}
                        />
                </td>
                <td>
                    {this.renderTools(slotId)}
                </td>
                <td>
                    <button
                        className="button-like widget-control red"
                        onClick={() => {
                            this.props.dispatch(destroySlot(slotId));
                        } }>
                        <i className="fa fa-times"></i>
                    </button>
                </td>
            </tr>;
        });
    }

    render() {
        let { set, updateCoordinate, updateToolBayName, add, updateToolSelect } = this;
        let { dispatch } = this.props;
        let { tool_bays, tools, tool_slots } = this.props.all;
        let stopEdit = () => { dispatch(stopEditing()); };
        return <div className="tool-bay-form">
            {tool_bays.map((bay, i) => {
                let { name } = bay;
                let bayId = bay.id;
                i++;
                return <Widget key={name}>
                    <WidgetHeader
                        helpText={t(`Toolbays are where you store your FarmBot
                          Tools. Each Toolbay has Slots that you can put your
                          Tools in, which should be reflective of your real
                          FarmBot hardware configuration.`)}
                        title={name}>
                        <button
                            className="green button-like widget-control"
                            onClick={dispatch(saveToolBays)}>
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
                            <tbody>
                                <tr>
                                    <td>
                                        <label>TOOLBAY NAME</label>
                                    </td>
                                    <td>
                                        <BlurableInput
                                            value={name}
                                            onCommit={updateToolBayName}
                                            id={(bayId || "").toString()}
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
                                    <th>TOOL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderSlots()}
                                <tr>
                                    <td>
                                        {tool_slots.length + 1}
                                    </td>
                                    <td>
                                        <BlurableInput
                                            value={this.state.x || ""}
                                            type="number"
                                            name="x"
                                            onCommit={set}
                                            />
                                    </td>
                                    <td>
                                        <BlurableInput
                                            value={this.state.y || ""}
                                            type="number"
                                            name="y"
                                            onCommit={set}
                                            />
                                    </td>
                                    <td>
                                        <BlurableInput
                                            value={this.state.z || ""}
                                            type="number"
                                            name="z"
                                            onCommit={set}
                                            />
                                    </td>
                                    <td>
                                        <Select value="0"
                                            onChange={updateToolSelect}>
                                            {tools.map(tool => {
                                                let { id } = tool;
                                                return <option key={id}>
                                                    {tool.name}
                                                </option>;
                                            })}
                                            <option
                                                key={tools.length + 1}
                                                value="0">---</option>
                                        </Select>
                                    </td>
                                    <td>
                                        <button
                                            className={`button-like
                                                    widget-control green`}
                                            onClick={() => add(bayId)}>
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </WidgetBody>
                </Widget>;
            })}
        </div >;
    }
};
