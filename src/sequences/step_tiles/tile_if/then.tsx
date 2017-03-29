import * as React from "react";
import { IfParams, seqDropDown, initialValue, updateSubSeq } from "./index";
import { t } from "i18next";
import { NewFBSelect } from "../../../ui/new_fb_select";

export function Then(props: IfParams) {
  let step = props.currentStep;
  let seq = props.currentSequence;
  let { dispatch, index } = props;
  let onChange = updateSubSeq("_then", dispatch, seq, index, step);
  return <div>
    <div className="col-xs-12 col-md-12">
      <h4>THEN...</h4>
    </div>
    <div className="col-xs-12 col-md-12">
      <label>{t("Execute Sequence")}</label>
      <NewFBSelect
        list={seqDropDown(props.resources)}
        placeholder="Sequence..."
        onChange={onChange}
        selectedItem={initialValue(props.currentStep.args._then, props.resources)}
      />
    </div>
  </div>
}
