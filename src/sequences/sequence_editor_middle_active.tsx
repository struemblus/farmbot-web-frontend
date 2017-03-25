import * as React from "react";
import { SequenceBodyItem, LegalSequenceKind } from "farmbot";
import {
  dispatcher,
  DataXferObj,
  ActiveMiddleProps,
  Sequence
} from "./interfaces";
import { execSequence } from "../devices/actions";
import {
  editCurrentSequence
} from "./actions";
import { renderCeleryNode } from "./step_tiles/index";
import { ColorPicker } from "./color_picker";
import { t } from "i18next";
import {
  BlurableInput,
  Widget,
  WidgetHeader,
  WidgetBody,
  Row,
  Col
} from "../ui";
import { DropArea } from "../draggable/drop_area";
import { stepGet } from "../draggable/actions";
import { pushStep, spliceStep, moveStep } from "./actions";
import { StepDragger, NULL_DRAGGER_ID } from "../draggable/step_dragger";
import { copySequence } from "./actions";
import { TaggedSequence } from "../resources/tagged_resources";
import { save, edit, destroy } from "../api/crud";
import { toastErrors } from "../util";

function routeIncomingDroppedItems(dispatch: dispatcher,
  key: string,
  dropperId: number) {
  let dataXferObj = dispatch(stepGet(key));
  let step = dataXferObj.value;
  switch (dataXferObj.intent) {
    case "step_splice":
      return dispatch(spliceStep(step, dropperId));
    case "step_move":
      let { draggerId } = dataXferObj;
      return dispatch(moveStep(step, draggerId, dropperId));
    default:
      throw new Error("Got unexpected data transfer object.");
  }
}

let onDrop = (dispatch: dispatcher, dropperId: number) => (key: string) => {
  routeIncomingDroppedItems(dispatch, key, dropperId);
};

let handleNameUpdate = (dispatch: Function, seq: TaggedSequence) =>
  (event: React.SyntheticEvent<HTMLInputElement>) => {
    let name: string = (event.currentTarget).value || "";
    let x: Partial<Sequence> = { name: name };
    dispatch(editCurrentSequence(dispatch, seq, x));
  };

let copy = function (dispatch: Function, sequence: TaggedSequence) {
  return (e: React.SyntheticEvent<HTMLButtonElement>) =>
    dispatch(copySequence(sequence));
};

export let performSeq = (dispatch: Function, s: TaggedSequence) => {
  return () => {
    dispatch(save(s.uuid)).then(() => execSequence(s.body));
  };
};

export class SequenceEditorMiddleActive extends React.Component<ActiveMiddleProps, {}> {

  render() {
    let { sequences, dispatch, tools, sequence, slots, resources } = this.props;
    let fixThisToo = function (key: string) {
      let xfer = dispatch(stepGet(key)) as DataXferObj;
      if (xfer.draggerId === NULL_DRAGGER_ID) {
        pushStep(xfer.value, dispatch, sequence);
      } else {
        let from = xfer.draggerId;
        // Remove it from where it was.
        // dispatch(removeStep(from));
        console.log("FIX THIS!")
        // Push it to the end.
        pushStep(xfer.value, dispatch, sequence);
      };
    };

    return <Widget className="sequence-editor-widget">
      <WidgetHeader title="Sequence Editor"
        helpText={`Drag and drop commands here to create
                   sequences for watering, planting seeds,
                   measuring soil properties, and more. Press the
                   Test button to immediately try your sequence
                   with FarmBot. You can also edit, copy, and delete
                   existing sequences; assign a color; and give
                   your commands custom names.`}>
        <button className="green button-like"
          onClick={() => {
            dispatch(save(sequence.uuid));
          }}>
          {t("Save")} {sequence && sequence.dirty && "*"}
        </button>
        <button className="orange button-like"
          onClick={performSeq(dispatch, sequence)}>
          {t("Save & Run")}
        </button>
        <button className="red button-like"
          onClick={() => dispatch(destroy(sequence.uuid)).then(null, toastErrors)}>
          {t("Delete")}
        </button>
        <button className="yellow button-like"
          onClick={copy(dispatch, sequence)}>
          {t("Copy")}
        </button>
      </WidgetHeader>
      <WidgetBody>
        <Row>
          <Col xs={11}>
            <BlurableInput value={sequence.body.name}
              onCommit={(e) => {
                dispatch(edit(sequence, { name: e.currentTarget.value }))
              }} />
          </Col>
          <ColorPicker current={sequence.body.color}
            onChange={color => editCurrentSequence(dispatch, sequence, { color })} />
        </Row>
        {(sequence.body.body || []).map((currentStep: SequenceBodyItem, index, arr) => {
          /** HACK: If we wrote `key={index}` for this iterator, React's diff
           * algorithm (probably?) loses track of which step has changed (and
           * sometimes even mix up the state of completely different steps).
           * To get around this, we add a `uuid` property to Steps that
           * is guaranteed to be unique and allows React to diff the list
           * correctly.
           */
          let wow = (currentStep as any).uuid || index;
          let currentSequence = sequence;
          return <div key={wow}>
            <DropArea callback={onDrop(dispatch as dispatcher, index)} />
            <StepDragger dispatch={dispatch}
              step={currentStep}
              ghostCss="step-drag-ghost-image-big"
              intent="step_move"
              draggerId={index}>
              {renderCeleryNode(currentStep.kind as LegalSequenceKind, {
                currentStep,
                index,
                dispatch: dispatch,
                sequences: sequences,
                currentSequence,
                slots,
                tools,
                resources
              })}
            </StepDragger>
          </div>;
        })}
        <Row>
          <Col xs={12}>
            <DropArea isLocked={true}
              callback={fixThisToo}>
              {t("DRAG STEP HERE")}
            </DropArea>
          </Col>
        </Row>
      </WidgetBody>
    </Widget>;
  }
}
