import * as React from "react";
import { IfParams, seqDropDown, initialValue, updateSubSeq } from "./index";
import { FBSelect } from "../../../ui/fb_select";
import { t } from "i18next";

export function Then(props: IfParams) {
  let { args } = props.currentStep;
  let step = props.currentStep;
  let seq = props.currentSequence;
  let { dispatch } = props;
  let onChange = updateSubSeq("_then", dispatch, seq, step);
  return <div>
    <div className="col-xs-12 col-md-12">
      <h4>THEN...</h4>
    </div>
    <div className="col-xs-12 col-md-12">
      <label>{t("Execute Sequence")}</label>
      <FBSelect
        list={seqDropDown(props.resources)}
        placeholder="Sequence..."
        onChange={onChange}
        initialValue={initialValue(props.currentStep.args._then, props.resources)}
      />
    </div>
  </div>
}
