import * as React from "react";
import { ListAndFormProps, ToolBayFormState } from "../interfaces";
import { Widget, WidgetBody, WidgetHeader } from "../../ui";
import { BlurableInput } from "../../blurable_input";
import {
    saveToolBays,
    destroySlot,
    addSlot,
    updateSlot,
    updateToolBayName
} from "../actions";
import { t } from "i18next";

export class ToolBayForm extends React.Component<ListAndFormProps,
    ToolBayFormState> {
    constructor() {
        super();
        this.set = this.set.bind(this);
        this.updateCoordinate = this.updateCoordinate.bind(this);
        this.updateToolBayName = this.updateToolBayName.bind(this);
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
        let { value, id } = e.currentTarget;
        this.props.dispatch(updateToolBayName({ value, id }));
    }

    add(bay_id: number) {
        let slotState = this.state;
        this.props.dispatch(addSlot({ slotState, bay_id }));
        this.resetState();
    }

    renderTools(slotId: number | undefined) {
        return <div className="select-wrapper">
            <select onChange={this.updateTool}>
                {this.props.all.tools.map((tool, toolNum = 0) => {
                    return <option key={toolNum}>
                        {tool.name}
                    </option>;
                })}
                <option>None</option>
            </select>
        </div>;
    }

    render() {
        let { set, updateCoordinate, updateToolBayName, add } = this;
        let { dispatch } = this.props;
        let { tool_bays, tool_slots, tools } = this.props.all;
        let slotNum = 0;
        return <div>
            {tool_bays.map((bay, i = 0) => {
                let { name } = bay;
                let bayId = bay.id;
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
                                    <th colSpan={4}>TOOL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tool_slots.map(slot => {
                                    let { x, y, z } = slot;
                                    let slotId = slot.id;
                                    slotNum++;
                                    return <tr key={slotNum}>
                                        <td>
                                            {slotNum}
                                        </td>
                                        <td>
                                            <BlurableInput
                                                type="number"
                                                id={(slotId || "").toString()}
                                                name="x"
                                                value={x.toString()}
                                                onCommit={updateCoordinate}
                                                />
                                        </td>
                                        <td>
                                            <BlurableInput
                                                type="number"
                                                id={(slotId || "").toString()}
                                                name="y"
                                                value={y.toString()}
                                                onCommit={updateCoordinate}
                                                />
                                        </td>
                                        <td>
                                            <BlurableInput
                                                type="number"
                                                id={(slotId || "").toString()}
                                                name="z"
                                                value={z.toString()}
                                                onCommit={updateCoordinate}
                                                />
                                        </td>
                                        <td colSpan={4}>
                                            {this.renderTools(slotId)}
                                        </td>
                                        <td>
                                            <button
                                                className={`button-like 
                                                    widget-control red`}
                                                onClick={() => {
                                                    dispatch(
                                                        destroySlot(slotId)
                                                    );
                                                } }>
                                                <i className="fa fa-times"></i>
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
