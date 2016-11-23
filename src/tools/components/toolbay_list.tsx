import * as React from "react";
import { ListAndFormProps } from "../interfaces";
import { Widget, WidgetBody, WidgetHeader } from "../../ui";
import { startEditing } from "../actions";
import * as _ from "lodash";
import { t } from "i18next";

export class ToolBayList extends React.Component<ListAndFormProps, {}> {
    renderTools(slotId: number | undefined) {
        return this.props.all.tools.map((tool, toolNum = 0) => {
            if (slotId === tool.slot_id) {
                return <td key={toolNum}>
                    {tool.name}
                </td>;
            }
        });
    }

    render() {
        let onClick = () => { this.props.dispatch(startEditing()); };
        let { tool_bays, tool_slots } = this.props.all;
        return <div>
            {tool_bays.map(bay => {
                let { id, name } = bay;
                let currentSlots = _.where(tool_slots, { tool_bay_id: id });

                return <Widget key={name}>
                    <WidgetHeader
                        helpText="Toolbays are for tools."
                        title={name}>
                        <button
                            className="gray button-like widget-control"
                            onClick={onClick}>
                            {t("EDIT")}
                        </button>
                    </WidgetHeader>
                    <WidgetBody>
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
                                {currentSlots.map((slot, slotNum = 1) => {
                                    let { x, y, z } = slot;
                                    let slotId = slot.id;
                                    slotNum++;
                                    return <tr key={slotNum}>
                                        <td>{slotNum}</td>
                                        <td>{x}</td>
                                        <td>{y}</td>
                                        <td>{z}</td>
                                        {this.renderTools(slotId)}
                                    </tr>;
                                })}
                            </tbody>
                        </table>
                    </WidgetBody>
                </Widget>;
            })}
        </div>;
    }
};
