import * as React from "react";
import { ListAndFormProps } from "../interfaces";
import { Widget, WidgetBody, WidgetHeader } from "../../ui";
import { startEditing } from "../actions";
import * as _ from "lodash";
import { t } from "i18next";

export class ToolList extends React.Component<ListAndFormProps, {}> {
    render() {
        let onClick = () => { this.props.dispatch(startEditing()); };
        let { tool_slots, tools } = this.props.all;
        return <div>
            <Widget>
                <WidgetHeader
                    helpText="Tools are for tooling."
                    title="TOOLS">
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
                                <th>TOOL</th>
                                <th>SLOT</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tools.map(tool => {
                                let { name, slot_id } = tool;
                                let slot = _.findWhere(tool_slots,
                                    { id: slot_id });
                                return <tr key={name}>
                                    <td>{name}</td>
                                    <td>{slot.id}</td>
                                    <td>INACTIVE</td>
                                </tr>;
                            })}
                        </tbody>
                    </table>
                </WidgetBody>
            </Widget>
        </div>;
    }
};
