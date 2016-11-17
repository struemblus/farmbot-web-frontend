import * as React from "react";
import { t } from "i18next";
import { Everything } from "../interfaces";
import { ToolsState } from "./interfaces";
import { ToolsForm } from "./tool_form";
import { connect } from "react-redux";

class XTools extends React.Component<Everything, ToolsState> {
    render() {
        let dirty = !!this.props.bot.account.dirty;

        return <div>
            <div className="all-content-wrapper">
                <div>
                    <div className="row">
                        <div className="col-md-5 col-sm-6 col-xs-12 col-md-offset-1">
                            <div>
                                <div className="widget-wrapper tools-widget">
                                    <div className="row">
                                        <div>
                                            <div className="col-sm-12">
                                                <button
                                                    className="gray button-like widget-control"
                                                    type="button">
                                                    {t("EDIT")}
                                                </button>
                                                {dirty &&
                                                    <button
                                                        className="green button-like widget-control"
                                                        type="button">
                                                        {t("SAVE")}
                                                    </button>
                                                }
                                                <div className="widget-header">
                                                    <h5>{t("Tools")}</h5>
                                                    <i className={`fa fa-question-circle
                                    widget-help-icon`}>
                                                        <div className="widget-help-text">
                                                            {t("Wow. Much words. So help.")}
                                                        </div>
                                                    </i>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="widget-content">
                                                    <ToolsForm
                                                        editorMode={this.props.tools.editorMode}
                                                        dispatch={this.props.dispatch}
                                                        />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export let Tools = connect((state: Everything) => state)(XTools);
