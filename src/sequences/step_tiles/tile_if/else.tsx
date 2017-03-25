import * as React from "react";
import { FBSelect } from "../../../ui/index";
import { IfParams, seqDropDown, initialValue, updateSubSeq } from "./index";
import { t } from "i18next";

export function Else(props: IfParams) {
  return <div>
    <div className="col-xs-12 col-md-12">
      <h4>ELSE...</h4>
    </div>
    <div className="col-xs-12 col-md-12">
      <label>{t("Execute Sequence")}</label>
      <FBSelect
        list={seqDropDown(props.resources)}
        placeholder="None (continue to next step)"
        onChange={updateSubSeq(props.currentStep.args._else)}
        initialValue={initialValue(props.currentStep.args._else, props.resources)}
      />
    </div>
  </div>;
}
