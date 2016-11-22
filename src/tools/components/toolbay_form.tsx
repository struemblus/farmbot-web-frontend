import * as React from "react";
import { ListAndFormProps, ToolBayFormState } from "../interfaces";
import { Widget, WidgetBody, WidgetHeader } from "../../ui";
import { BlurableInput } from "../../blurable_input";
import { saveToolBays, destroySlot, addSlot } from "../actions";
import { success } from "../../logger";
import { t } from "i18next";

export class ToolBayForm extends React.Component<ListAndFormProps,
    ToolBayFormState> {
    constructor() {
        super();
        this.set = this.set.bind(this);
        this.update = this.update.bind(this);
        this.add = this.add.bind(this);
        this.state = { x: "0", y: "0", z: "0", name: "", tool_bay_id: 0 };
    }

    componentDidMount() {
        success(
            "Subscribe to the FarmBot.io mailing list for news and updates.",
            "Work in Progress"
        );
    }

    set(e: React.SyntheticEvent<HTMLSelectElement> |
        React.SyntheticEvent<HTMLSelectElement>) {
        let { name, value } = e.currentTarget;
        // this.setState({ [name]: value });
    }

    update(e: React.SyntheticEvent<HTMLSelectElement> |
        React.SyntheticEvent<HTMLSelectElement>) {
        console.log("CHANGED");
        // update dirty state
        // console.log(e.currentTarget.name.split("-"));
    }

    add(bay_id: number) {
        let slotState = this.state;
        this.props.dispatch(addSlot({ slotState, bay_id }));
    }

    render() {
        let { set, update, add } = this;
        let { dispatch } = this.props;
        let { tool_bays, tool_slots, tools } = this.props.all;
        let slotNum = 0;
        return <div>
            {tool_bays.map((bay, i = 0) => {
                let { name } = bay;
                let bay_id = bay.id;
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
                                    <th>TOOL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tool_slots.map(slot => {
                                    let { x, y, z } = slot;
                                    let slot_id = slot.id;
                                    slotNum++;
                                    return <tr key={slotNum}>
                                        <td>
                                            {slotNum}
                                        </td>
                                        <td>
                                            <BlurableInput
                                                value={x.toString()}
                                                onCommit={update}
                                                />
                                        </td>
                                        <td>
                                            <BlurableInput
                                                value={y.toString()}
                                                onCommit={update}
                                                />
                                        </td>
                                        <td>
                                            <BlurableInput
                                                value={z.toString()}
                                                onCommit={update}
                                                />
                                        </td>
                                        <td>
                                            <div className="select-wrapper">
                                                <select onChange={update}>
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
                                                    dispatch(
                                                        destroySlot(slot_id)
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
                                                {
                                                    tools.map(tool => {
                                                        return <option key={
                                                            tool.id
                                                        }>
                                                            {tool.name}
                                                        </option>;
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className={`button-like 
                                                    widget-control green`}
                                            onClick={() => add(bay_id)}>
                                            <i className="fa fa-plus"></i>
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
