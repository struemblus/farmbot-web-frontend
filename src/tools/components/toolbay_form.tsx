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
        this.addToolSlot = this.addToolSlot.bind(this);
        this.resetState = this.resetState.bind(this);
        this.state = { x: 0, y: 0, z: 0, tool_id: 0 };
    }

    resetState() {
        this.setState({ x: 0, y: 0, z: 0, tool_id: 0 });
    }

    set(e: React.SyntheticEvent<HTMLInputElement> |
        React.SyntheticEvent<HTMLSelectElement>) {
        let { name, value } = e.currentTarget;
        this.setState({ [name]: parseInt(value) });
    }

    updateCoordinate(e: React.SyntheticEvent<HTMLInputElement>) {
        let { id, name, value } = e.currentTarget;
        let { dispatch } = this.props;
        dispatch(updateSlot(parseInt(id), name, parseInt(value)));
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

    addToolSlot(tool_bay_id: number) {
        this.props.dispatch(addSlot(this.state, tool_bay_id));
        this.resetState();
    }

    renderTools(tool_id: number | undefined) {
        let { tools } = this.props.all;
        let defaultValue = 0;
        let options = tools.all.map((tool, index) => {
            index++;
            let { id, name } = tool;
            if (tool.id === tool_id) {
                defaultValue = id;
            };
            return <option value={id} key={index}>{name}</option>;
        });
        return <Select onChange={this.updateTool}
            value={defaultValue.toString()}>
            {options}
            <option value="0">---</option>
        </Select>;
    }

    renderSlots(tool_bay_id: number | undefined) {
        return this.props.all.tool_slots.map((slot, index) => {
            index++;
            let { x, y, z, tool_id, id } = slot;
            return <tr key={index}>
                <td>
                    {index}
                </td>
                <td>
                    <BlurableInput
                        type="number"
                        id={(id || "").toString()}
                        name="x"
                        value={(x || "").toString()}
                        onCommit={this.updateCoordinate}
                        />
                </td>
                <td>
                    <BlurableInput
                        type="number"
                        id={(id || "").toString()}
                        name="y"
                        value={(y || "").toString()}
                        onCommit={this.updateCoordinate}
                        />
                </td>
                <td>
                    <BlurableInput
                        type="number"
                        id={(id || "").toString()}
                        name="z"
                        value={(z || "").toString()}
                        onCommit={this.updateCoordinate}
                        />
                </td>
                <td>
                    {this.renderTools(tool_id)}
                </td>
                <td>
                    <button
                        className="button-like widget-control red"
                        onClick={() => {
                            /** TODO: This isn't right, but if I make the id 
                             *  required, TS throws errors everywhere. I'll
                             *  have to come back to this. -CV
                            */
                            this.props.dispatch(destroySlot(id || 0));
                        } }>
                        <i className="fa fa-times"></i>
                    </button>
                </td>
            </tr>;
        });
    }

    render() {
        let {
            set,
            updateCoordinate,
            updateToolBayName,
            addToolSlot,
            updateToolSelect
        } = this;
        let { dispatch } = this.props;
        let { tool_bays, tools, tool_slots } = this.props.all;
        let stopEdit = () => { dispatch(stopEditing()); };
        return <div className="tool-bay-form">
            {tool_bays.map((bay, index) => {
                index++;
                let { name } = bay;
                let { x, y, z } = this.state;
                let tool_bay_id = bay.id;
                return <Widget key={index}>
                    <WidgetHeader
                        helpText="Bays are for Tools"
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
                                            id={(tool_bay_id || "").toString()}
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
                                {this.renderSlots(tool_bay_id)}
                                <tr>
                                    <td>
                                        {tool_slots.length + 1}
                                    </td>
                                    <td>
                                        <BlurableInput
                                            value={(x || "").toString()}
                                            type="number"
                                            name="x"
                                            onCommit={set}
                                            />
                                    </td>
                                    <td>
                                        <BlurableInput
                                            value={(y || "").toString()}
                                            type="number"
                                            name="y"
                                            onCommit={set}
                                            />
                                    </td>
                                    <td>
                                        <BlurableInput
                                            value={(z || "").toString()}
                                            type="number"
                                            name="z"
                                            onCommit={set}
                                            />
                                    </td>
                                    <td>
                                        <Select value="0"
                                            onChange={updateToolSelect}>
                                            {tools.all.map((tool, iTool) => {
                                                iTool++;
                                                return <option key={iTool}>
                                                    {tool.name}
                                                </option>;
                                            })}
                                            <option
                                                key={tools.all.length + 1}
                                                value="0">---</option>
                                        </Select>
                                    </td>
                                    <td>
                                        <button
                                            className={`button-like 
                                                    widget-control green`}
                                            onClick={() => addToolSlot(
                                                tool_bay_id
                                            )}>
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
