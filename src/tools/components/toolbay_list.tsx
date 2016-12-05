import * as React from "react";
import { ListAndFormProps } from "../interfaces";
import { Widget, WidgetBody, WidgetHeader } from "../../ui";
import { startEditing } from "../actions";
import * as _ from "lodash";
import { t } from "i18next";

export class ToolBayList extends React.Component<ListAndFormProps, {}> {
    renderTool(toolId: number | undefined) {
        return this.props.all.tools.map((tool, i) => {
            if (toolId === tool.id) {
                return <td key={i}>
                    {tool.name}
                </td>;
            }
        });
    }

    renderSlots(bayId: number) {
        let { tool_slots } = this.props.all;
        let currentSlots = _.where(tool_slots, { tool_bay_id: bayId });
        return currentSlots.map((slot, i) => {
            let { x, y, z, tool_id } = slot;
            i++;
            return <tr key={i}>
                <td>{i}</td>
                <td>{x}</td>
                <td>{y}</td>
                <td>{z}</td>
                {this.renderTool(tool_id)}
            </tr>;
        });
    }

    render() {
        let onClick = () => { this.props.dispatch(startEditing()); };
        let { tool_bays } = this.props.all;
        return <div>
            {tool_bays.map(bay => {
                let { id, name } = bay;
                return <Widget key={name}>
                    <WidgetHeader
                        helpText={t(`Toolbays are where you store your FarmBot
                          Tools. Each Toolbay has Slots that you can put your
                          Tools in, which should be reflective of your real
                          FarmBot hardware configuration.`)}
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
                                {this.renderSlots(id)}
                            </tbody>
                        </table>
                    </WidgetBody>
                </Widget>;
            })}
        </div>;
    }
};
