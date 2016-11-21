import * as React from "react";
import { ListAndFormProps } from "../interfaces";
import { Widget, WidgetBody, WidgetHeader } from "../../ui";
import { startEditing } from "../actions";
import * as _ from "lodash";
import { t } from "i18next";

export class ToolList extends React.Component<ListAndFormProps, {}> {
    renderTools() {
        this.props.all.tools.map(tool => {
            let { name } = tool;
            return <tr key={name}>
                <td>NAME</td>
                <td>SLOT ID</td>
                <td>INACTIVE</td>
            </tr>;
        });
    }
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
                                <th>TOOL NAME</th>
                                <th>SLOT</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTools()}
                        </tbody>
                    </table>
                </WidgetBody>
            </Widget>
        </div>;
    }
};
