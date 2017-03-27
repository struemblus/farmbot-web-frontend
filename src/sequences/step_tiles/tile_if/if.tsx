import * as React from "react";
import { IfParams, LHSOptions, updateField, operatorOptions } from "./index";
import { t } from "i18next";
import { DeprecatedFBSelect } from "../../../ui/index";
import { StepInputBox } from "../../inputs/step_input_box";

export function If_(props: IfParams) {
  let {
    dispatch,
    currentStep,
    currentSequence,
    index
  } = props;
  let { op, lhs } = currentStep.args;
  return <div>
    <div className="col-xs-12 col-md-12">
      <h4 className="top">IF...</h4>
    </div>
    <div className="col-xs-4 col-md-4">
      <label>{t("Variable")}</label>
      <DeprecatedFBSelect
        list={LHSOptions}
        placeholder="Left hand side"
        onChange={updateField("lhs", dispatch)}
        initialValue={{ label: lhs, value: lhs }}
      />
    </div>
    <div className="col-xs-4 col-md-4">
      <label>{t("Operator")}</label>
      <DeprecatedFBSelect
        list={operatorOptions}
        placeholder="Operation"
        onChange={updateField("op", dispatch)}
        initialValue={{ label: op, value: op }}
      />
    </div>
    <div className="col-xs-4 col-md-4">
      <label>{t("Right hand side")}</label>
      <StepInputBox dispatch={dispatch}
        step={currentStep}
        sequence={currentSequence}
        index={index}
        field="rhs" />
    </div>
  </div>;
}
