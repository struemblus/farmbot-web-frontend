import * as React from "react";
import { StepParams } from "./index";
import { Help, Select } from "../../ui";
import { t } from "i18next";
import { copy, remove, updateStep } from "./index";
import { StepTitleBar } from "./step_title_bar";
import { StepInputBox } from "../inputs/step_input_box";
import { SelectOptionsParams } from "../../interfaces";

export function TileIfStatment({dispatch, step, index, sequences, sequence}:
    StepParams) {

    /** TODO: Hack?, is this node not getting the SendMessage interface? 
    * says step.args.* does not exist. */
    let args = step.args as any;
    let { lhs, op } = args;

    let LHSOptions: SelectOptionsParams[] = [
        { value: "busy", label: "Busy Status (0, 1)" },
        { value: "pin0", label: "Pin 0" },
        { value: "pin1", label: "Pin 1" },
        { value: "pin2", label: "Pin 2" },
        { value: "pin3", label: "Pin 3" },
        { value: "pin4", label: "Pin 4" },
        { value: "pin5", label: "Pin 5" },
        { value: "pin6", label: "Pin 6" },
        { value: "pin7", label: "Pin 7" },
        { value: "pin8", label: "Pin 8" },
        { value: "pin9", label: "Pin 9" },
        { value: "pin10", label: "Pin 10" },
        { value: "pin11", label: "Pin 11" },
        { value: "pin12", label: "Pin 12" },
        { value: "pin13", label: "Pin 13" },
        { value: "x", label: "X position" },
        { value: "y", label: "Y Position" },
        { value: "z", label: "Z position" }
    ];

    let sequenceOptions: SelectOptionsParams[] = sequences.map(seq => {
        return {
            label: seq.name ? seq.name : "SEQUENCE NAME NOT FOUND",
            value: seq.id ? seq.id : "SEQUENCE ID NOT FOUND"
        };
    });

    let OperatorOptions: SelectOptionsParams[] = [
        { value: "<", label: "is less than" },
        { value: ">", label: "is greater than" },
        { value: "is", label: "is equal to" },
        { value: "not", label: "X position" }
    ];

    // TODO: Anys coming from react-select events
    let changeSubSequence = (e: any) => {
        // console.dir(e);
        // updateStep({ dispatch, step, index });
    };

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
                                {/*<StepInputBox dispatch={dispatch}
                                    step={step}
                                    index={index}
                                    field="lhs" />*/}
                                <Select
                                    options={LHSOptions}
                                    placeholder="LHS..."
                                    onChange={changeSubSequence}
                                    value={lhs}
                                    />
                            </div>
                            <div className="col-xs-6 col-md-3">
                                <label>{t("OPERATOR")}</label>
                                {/*<StepInputBox dispatch={dispatch}
                                    step={step}
                                    index={index}
                                    field="op" />*/}
                                <Select
                                    options={OperatorOptions}
                                    placeholder="Condition..."
                                    onChange={changeSubSequence}
                                    value={op}
                                    />
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
                                {/*<StepInputBox dispatch={dispatch}
                                    step={step}
                                    index={index}
                                    field="sub_sequence_id" />*/}
                                <Select
                                    options={sequenceOptions}
                                    placeholder="Sequence..."
                                    onChange={changeSubSequence}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
