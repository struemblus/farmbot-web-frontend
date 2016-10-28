import * as React from "react";
import { StepParams } from "./index";
import { Help } from "../../help";
import { t } from "i18next";
import { copy, remove } from "./index";
import { StepTitleBar } from "./step_title_bar";
import { StepInputBox } from "../inputs/step_input_box";

export function TileIfStatment({dispatch, step, index}: StepParams) {
    return (<div>
        <div className="step-wrapper">
            <div className="row">
                <div className="col-sm-12">
                    <div className="step-header if-step">
                        <StepTitleBar index={index}
                            dispatch={dispatch}
                            step={step} />
                        <i className="fa fa-arrows-v step-control" />
                        <i className="fa fa-clone step-control"
                            onClick={() => copy({ dispatch, step })} />
                        <i className="fa fa-trash step-control"
                            onClick={() => remove({ dispatch, index })} />
                        <Help text={(`Detailed documentation coming soon`)} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="step-content if-step">
                        <div className="row">
                            <div className="col-xs-6 col-md-3">
                                <label>{t("LHS")}</label>
                                <StepInputBox dispatch={dispatch}
                                    step={step}
                                    index={index}
                                    field="lhs" />
                            </div>
                            <div className="col-xs-6 col-md-3">
                                <label>{t("OPPERATOR")}</label>
                                <StepInputBox dispatch={dispatch}
                                    step={step}
                                    index={index}
                                    field="op" />
                            </div>
                            <div className="col-xs-6 col-md-3">
                                <label>{t("RHS")}</label>
                                <StepInputBox dispatch={dispatch}
                                    step={step}
                                    index={index}
                                    field="rhs" />
                            </div>
                            <div className="col-xs-6 col-md-3">
                                <label>{t("Sub Sequence")}</label>
                                <StepInputBox dispatch={dispatch}
                                    step={step}
                                    index={index}
                                    field="sub_sequence_id" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
