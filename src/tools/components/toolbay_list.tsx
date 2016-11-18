import * as React from "react";
import { ToolBayProps, ToolBayState } from "../interfaces";
import { Widget, WidgetBody, WidgetHeader } from "../../ui";
import { startEditing } from "../actions";
import { t } from "i18next";

export class ToolBayList extends React.Component<ToolBayProps, ToolBayState> {
    render() {
        let onClick = () => { this.props.dispatch(startEditing()); };
        return <div>
            {this.props.all.map(item => {
                let { name, help_text, slots } = item;
                return <Widget key={name}>
                    <WidgetHeader
                        helpText={help_text}
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
                                {slots.map((item, i = 1) => {
                                    let { tool_id, x, y, z } = item;
                                    i++;
                                    return <tr key={i}>
                                        <td>{i}</td>
                                        <td>{x}</td>
                                        <td>{y}</td>
                                        <td>{z}</td>
                                        <td>{tool_id}</td>
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
