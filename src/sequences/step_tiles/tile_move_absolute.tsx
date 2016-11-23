import * as React from "react";
import { StepParams } from "./index";
import { StepTitleBar } from "./step_title_bar";
import { Help } from "../../help";
import { copy, remove } from "./index";
import { t } from "i18next";
import { StepInputBox } from "../inputs/step_input_box";

export function TileMoveAbsolute({dispatch, step, index}: StepParams) {
    return (<div>
        <div className="step-wrapper">
            <div className="row">
                <div className="col-sm-12">
                    <div className="step-header move-absolute-step">
                        <StepTitleBar index={index}
                            dispatch={dispatch}
                            step={step} />
                        <i className="fa fa-arrows-v step-control" />
                        <i className="fa fa-clone step-control"
                            onClick={() => copy({ dispatch, step })} />
                        <i className="fa fa-trash step-control"
                            onClick={() => remove({ dispatch, index })} />
                        <Help text={(`The Move Absolute step instructs FarmBot
                      to move to the specified coordinate regardless of the 
                      current position. For example, if FarmBot is currently at 
                      X=1000, Y=1000 and it receives a Move Absolute where X=0 
                      and Y=3000, then FarmBot will move to X=0, Y=3000. If 
                      FarmBot must move in multiple directions, it will move 
                      diagonally. If you require straight movements along one
                      axis at a time, use multiple Move Absolute steps. Coming 
                      soon: Offsets allow you to more easily instruct FarmBot to 
                      move to a location, but offset from it by the specified 
                      amount. For example moving to just above where a 
                      peripheral is located. Using offsets lets FarmBot do the 
                      math for you.`)} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="step-content move-absolute-step">
                        <div className="row">
                            <div className="col-xs-6 col-md-3">
                                <label>{t("X (mm)")}</label>
                                <StepInputBox dispatch={dispatch}
                                    step={step}
                                    index={index}
                                    field="x" />
                            </div>
                            <div className="col-xs-6 col-md-3">
                                <label>{t("Y (mm)")}</label>
                                <StepInputBox dispatch={dispatch}
                                    step={step}
                                    index={index}
                                    field="y" />
                            </div>
                            <div className="col-xs-6 col-md-3">
                                <label>{t("Z (mm)")}</label>
                                <StepInputBox dispatch={dispatch}
                                    step={step}
                                    index={index}
                                    field="z" />
                            </div>
                            <div className="col-xs-6 col-md-3">
                                <label>{t("Speed")}</label>
                                <StepInputBox dispatch={dispatch}
                                    step={step}
                                    index={index}
                                    field="speed" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
