import * as React from "react";
import { IfParams, seqDropDown, initialValue, updateSubSeq } from "./index";
import { t } from "i18next";
import { NewFBSelect } from "../../../ui/new_fb_select";

export function Else(props: IfParams) {
  let step = props.currentStep;
  let seq = props.currentSequence;
  let { dispatch, index } = props;
  let onChange = updateSubSeq("_else", dispatch, seq, index, step);
  return <div>
    <div className="col-xs-12 col-md-12">
      <h4>ELSE...</h4>
    </div>
    <div className="col-xs-12 col-md-12">
      <label>{t("Execute Sequence")}</label>
      <NewFBSelect
        list={seqDropDown(props.resources)}
        placeholder="None (continue to next step)"
        onChange={onChange}
        selectedItem={initialValue(props.currentStep.args._else, props.resources)}
      />
    </div>
  </div>;
}
