import * as axios from "axios";
import { CeleryNode as Step, LATEST_VERSION, uuid } from "farmbot";
import {
  SequenceOptions,
  Sequence,
  ChanParams,
  MessageParams,
  EditCurrentSequence,
  PushStep,
  SpliceStepPayl,
  MoveStepPayl,
  ChangeStep,
  ChangeStepSelect,
  RemoveStep,
  SelectSequence
} from "./interfaces";
import { DropDownItem } from "../ui";
import { ReduxAction, Thunk } from "../redux/interfaces";
import { update, create, destroy } from "../api/crud";

export function saveSequence(body: Sequence): Thunk {
  const action = body.id ? update : create;
  return action({ kind: "sequences", uuid: uuid(), body });
}

export function deleteSequence(body: Sequence): Thunk {
  return destroy({ kind: "sequences", uuid: uuid(), body });
}

export function addChan({ channel_name, index }: ChanParams) {
  return {
    type: "ADD_CHANNEL",
    payload: { channel_name, index }
  };
}

export function removeChan({ channel_name, index }: ChanParams) {
  return {
    type: "REMOVE_CHANNEL",
    payload: { channel_name, index }
  };
}

export function updateMessageType({ value, index }: MessageParams) {
  return {
    type: "UPDATE_MESSAGE_TYPE",
    payload: { value, index }
  };
}

export function nullSequence(): Sequence {
  return {
    color: "gray",
    name: "New Sequence",
    kind: "sequence",
    args: {
      version: LATEST_VERSION
    },
    body: [],
    dirty: false
  };
}

export function copySequence(payload: Sequence) {
  return {
    type: "COPY_SEQUENCE",
    payload
  };
}

export function editCurrentSequence(updates: SequenceOptions):
  ReduxAction<EditCurrentSequence> {
  return {
    type: "EDIT_CURRENT_SEQUENCE",
    payload: updates
  };
}

export function pushStep(step: Step): PushStep {
  return {
    type: "PUSH_STEP",
    payload: { step }
  };
}

export function spliceStep(step: Step, insertBefore: number):
  ReduxAction<SpliceStepPayl> {
  return {
    type: "SPLICE_STEP",
    payload: { step, insertBefore }
  };
}

export function moveStep(step: Step,
  from: number,
  to: number):
  ReduxAction<MoveStepPayl> {
  return {
    type: "MOVE_STEP",
    payload: { step, from, to }
  };
}

export function changeStep(index: number, step: Step): ChangeStep {
  return {
    type: "CHANGE_STEP",
    payload: { step, index }
  };
}

export function changeStepSelect(
  value: string | number,
  index: number,
  field: string): ChangeStepSelect {
  return {
    type: "CHANGE_STEP_SELECT",
    payload: { value, index, field }
  };
}

export function changeMoveAbsStepSelect(
  index: number,
  tool: DropDownItem,
  step: Step) {
  return {
    type: "CHANGE_MOVE_ABS_STEP_SELECT",
    payload: { index, tool, step }
  };
}

// Would be nice to factor this down to fit with CHANGE_STEP
export function changeMoveAbsStepValue(value: string,
  kind: string,
  index: number) {
  return {
    type: "CHANGE_MOVE_ABS_STEP_VALUE",
    payload: { value, kind, index }
  };
}

export function updateSubSequence(
  value: string | number,
  index: number,
  field: string, type: string): ChangeStepSelect {
  return {
    type: "UPDATE_SUB_SEQUENCE",
    payload: { value, index, field, type }
  };
}

export function removeStep(index: number): RemoveStep {
  return {
    type: "REMOVE_STEP",
    payload: { index }
  };
}

export function selectSequence(index: number): SelectSequence {
  return {
    type: "SELECT_SEQUENCE",
    payload: index
  };
}

export function addSequence() {
  return {
    type: "ADD_SEQUENCE",
    payload: {}
  };
}

export function addComment(step: Step, index: number, comment: string) {
  return {
    type: "ADD_COMMENT",
    payload: { comment, index }
  };
}
