import * as React from "react";
import { StepParams } from "./index";
import { StepTitleBar } from "./step_title_bar";
import { Help } from "../../help";
import { copy, remove } from "./index";
import { t } from "i18next";
import { StepInputBox } from "../inputs/step_input_box";

export function TileSendMessage({dispatch, step, index}: StepParams) {
    return (<div>
        <div className="step-wrapper">
            <div className="row">
                <div className="col-sm-12">
                    <div className="step-header send-message-step">
                        <StepTitleBar index={index}
                            dispatch={dispatch}
                            step={step} />
                        <i className="fa fa-arrows-v step-control" />
                        <i className="fa fa-clone step-control"
                            onClick={() => copy({ dispatch, step })} />
                        <i className="fa fa-trash step-control"
                            onClick={() => remove({ dispatch, index })} />
                        <Help text={(`The Send Message step instructs FarmBot to
                      send a custom message to the logs. This can help you with
                      debugging your sequences. Eventually you will be able to
                      receive push notifications and email alerts of these messages!`)} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="step-content send-message-step">
                        <div className="row">
                            <div className="col-xs-12">
                                <label>{t("Message")}</label>
                                <StepInputBox dispatch={dispatch}
                                    step={step}
                                    index={index}
                                    field="message" />
                                <div className="channel-fields">
                                    <fieldset>
                                        <label
                                            htmlFor="ticker-error">
                                            Ticker Error
                                            </label>
                                        <input type="checkbox"
                                            id="ticker-error" />
                                    </fieldset>
                                    <fieldset>
                                        <label
                                            htmlFor="toast-error">
                                            Toast Error
                                            </label>
                                        <input type="checkbox"
                                            id="toast-error" />
                                    </fieldset>
                                    <fieldset>
                                        <label
                                            htmlFor="toast-success">
                                            Toast Success
                                            </label>
                                        <input type="checkbox"
                                            id="toast-success" />
                                    </fieldset>
                                    <fieldset>
                                        <label
                                            htmlFor="toast-warning">
                                            Toast Warning
                                            </label>
                                        <input type="checkbox"
                                            id="toast-warning" />
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}