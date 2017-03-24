import * as React from "react";
import { SequenceBodyItem as Step } from "farmbot";
import { NUMERIC_FIELDS } from "../interfaces";
import { ExecuteBlock } from "../execute_block";
import { StepParams, StepInputProps } from "../interfaces";
import { defensiveClone } from "../../util";
import { TileIf } from "./tile_if";
import { TileWait } from "./tile_wait";
import { TileMoveAbsolute } from "./tile_move_absolute";
import { TileMoveRelative } from "./tile_move_relative";
import { TileReadPin } from "./tile_read_pin";
import { TileSendMessage } from "./tile_send_message";
import { TileWritePin } from "./tile_write_pin";
import { TileExecuteScript } from "./tile_execute_script";
import { TileTakePhoto } from "./tile_take_photo";
import * as _ from "lodash";
import { CeleryNode, LegalSequenceKind, LegalArgString } from "farmbot";
import { TaggedSequence } from "../../resources/tagged_resources";
import { edit, overwrite } from "../../api/crud";

interface CopyParams {
  dispatch: Function;
  step: Step;
  sequence: TaggedSequence
}

export function copy({ dispatch, step, sequence }: CopyParams) {
  let copy = defensiveClone(step);
  let next = defensiveClone(sequence);
  let seq = next.body;
  seq.body = seq.body || [];
  seq.body.splice(_.indexOf(seq.body, copy), 0, copy);
  dispatch(overwrite(sequence, next.body));
};

interface RemoveParams {
  index: number;
  dispatch: Function;
  sequence: TaggedSequence;
}

export function remove({ dispatch, index, sequence }: RemoveParams) {
  let original = sequence;
  let update = defensiveClone(original);
  update.body.body = (update.body.body || []);
  delete update.body.body[index];
  update.body.body = _.compact(update.body.body);
  dispatch(overwrite(original, update.body));
}

export function updateStep(props: StepInputProps) {
  return (e: React.FormEvent<HTMLInputElement>) => {
    let { dispatch, step, index, sequence, field } = props;
    let stepCopy = defensiveClone(step);
    let seqCopy = defensiveClone(sequence).body;
    let val = e.currentTarget.value;
    let isNumeric = NUMERIC_FIELDS.includes(field);
    seqCopy.body = seqCopy.body || [];

    if (isNumeric) {
      numericNonsense(val, stepCopy, field);
    } else {
      _.assign(stepCopy.args, { [field]: val });
    };

    seqCopy.body[index] = stepCopy;
    dispatch(overwrite(sequence, seqCopy));
  };
};

function numericNonsense(val: string, copy: CeleryNode, field: LegalArgString) {
  // Fix negative number issues.
  let num = (val == "-") ? "-" : parseInt(val, 10);
  return _.assign(copy.args, { [field]: num });
}

export function renderCeleryNode(kind: LegalSequenceKind, props: StepParams) {
  switch (kind) {
    case "execute": return <ExecuteBlock {...props} />;
    case "_if": return <TileIf {...props} />;
    case "move_relative": return <TileMoveRelative {...props} />;
    case "move_absolute": return <TileMoveAbsolute {...props} />;
    case "write_pin": return <TileWritePin {...props} />;
    case "wait": return <TileWait {...props} />;
    case "send_message": return <TileSendMessage {...props} />;
    case "read_pin": return <TileReadPin {...props} />;
    case "execute_script": return <TileExecuteScript {...props} />;
    case "take_photo": return <TileTakePhoto {...props} />;
    default: return <div><hr /> ? Unknown step ? <hr /></div>;
  }
};
