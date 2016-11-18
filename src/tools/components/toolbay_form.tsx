import * as React from "react";
import { ListAndFormProps } from "../interfaces";
import { Widget, WidgetBody, WidgetHeader } from "../../ui";
import { BlurableInput } from "../../blurable_input";
import { saveToolBays } from "../actions";
import { t } from "i18next";

export class ToolBayForm extends React.Component<ListAndFormProps, {}> {
    constructor() {
        super();
        this.set = this.set.bind(this);
    }

    set(e: React.SyntheticEvent<HTMLInputElement>) {
        // update dirty state
    }

    render() {
        let { set } = this;
        let { dispatch } = this.props;
        let { tool_bays, tool_slots } = this.props.all;
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
                                    <th>TOOL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tool_slots.map((item, slot = 0) => {
                                    let { tool_bay_id, x, y, z } = item;
                                    slot++;
                                    return <tr key={slot}>
                                        <td>
                                            {slot}
                                        </td>
                                        <td>
                                            <BlurableInput
                                                value={x.toString()}
                                                onCommit={set}
                                                />
                                        </td>
                                        <td>
                                            <BlurableInput
                                                value={y.toString()}
                                                onCommit={set}
                                                />
                                        </td>
                                        <td>
                                            <BlurableInput
                                                value={z.toString()}
                                                onCommit={set}
                                                />
                                        </td>
                                        <td>
                                            <BlurableInput
                                                value={tool_bay_id.toString()}
                                                onCommit={set}
                                                />
                                        </td>
                                        <td>
                                            <button
                                                className={`button-like 
                                                    widget-control red`}>
                                                X
                                            </button>
                                        </td>
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
