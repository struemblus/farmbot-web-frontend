import * as React from "react";
import { IfParams, seqDropDown, initialValue, updateSubSeq } from "./index";
import { t } from "i18next";
import { NewFBSelect, NULL_CHOICE } from "../../../ui/new_fb_select";
import { DropDownItem } from "../../../ui/index";
import { findSequenceById } from "../../../resources/selectors";
import { defensiveClone } from "../../../util";
import { overwrite } from "../../../api/crud";

export function Then(props: IfParams) {
  let step = props.currentStep;
  let innerStep = step.args._then;

  function overwriteStep(input: typeof step.args._then) {
    console.log("OVERWRITING WITH " + input.kind);
    let update = defensiveClone(step);
    let nextSequence = defensiveClone(props.currentSequence).body;
    update.args._then = input;
    (nextSequence.body || [])[props.index] = update;
    props.dispatch(overwrite(props.currentSequence, nextSequence));
  }

  function updateStepOnChange(e: DropDownItem) {
    if (Object.is(NULL_CHOICE, e)) {
      overwriteStep({ kind: "nothing", args: {} });
    } else {
      let v = _.isNumber(e.value) && e.value;
      v && overwriteStep({ kind: "execute", args: { sequence_id: v } })
    }
  };

  function generateDropDownItem() {
    let ddi: DropDownItem = { label: "Nothing", value: 0 };
    if (innerStep.kind === "execute") {
      let s = findSequenceById(props.resources, innerStep.args.sequence_id);
      console.log("GOT SEQUENCE");
      ddi.label = s.body.name;
      ddi.value = s.body.id as number;
    }
    return ddi;
  }
  return <div>
    <div className="col-xs-12 col-md-12">
      <h4>THEN...</h4>
    </div>
    <div className="col-xs-12 col-md-12">
      <label>{t("Execute Sequence")}</label>
      <NewFBSelect
        allowEmpty={true}
        list={seqDropDown(props.resources)}
        placeholder="Sequence..."
        onChange={updateStepOnChange}
        selectedItem={generateDropDownItem()}
      />
    </div>
  </div>
}

function probe(a: any, b: any) {
  console.log(`
  Inner Step is:     ${JSON.stringify(a).slice(a, 25)}
  Drop down item is: ${JSON.stringify(b).slice(b, 25)}
`);
}
