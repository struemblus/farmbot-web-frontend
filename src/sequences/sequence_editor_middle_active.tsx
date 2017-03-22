import * as React from "react";
import { SequenceBodyItem } from "farmbot";
import {
  Sequence,
  dispatcher,
  DataXferObj,
  SequenceEditorMiddleProps,
  StepListProps,
  DynamicStepListProps
} from "./interfaces";
import { execSequence } from "../devices/actions";
import {
  editCurrentSequence, saveSequence, deleteSequence
} from "./actions";
import { stepTiles, StepTile } from "./step_tiles/index";
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
import { pushStep, spliceStep, moveStep, removeStep } from "./actions";
import { StepDragger, NULL_DRAGGER_ID } from "../draggable/step_dragger";
import { copySequence } from "./actions";
import { TaggedSequence, isTaggedSequence } from "../resources/tagged_resources";

let Oops: StepTile = (_) => {
  return <div>{t("Whoops! Not a valid message_type")}</div>;
};

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

function DynamicallyLoadedStepList({
  sequence,
  sequences,
  dispatch,
  tools
}: DynamicStepListProps) {
  if (sequence && isTaggedSequence(sequence)) {
    return <StepList
      sequence={sequence}
      sequences={sequences}
      dispatch={dispatch}
      tools={tools} />;
  }
}

function NoSequence() {
  return <p>Please select a sequence</p>;
}
let StepList = ({ sequence, sequences, dispatch, tools }: StepListProps) => {

  return <div>
    {(sequence.body.body || []).map((step: SequenceBodyItem, inx, arr) => {
      let Step = stepTiles[step.kind] || Oops;
      /** HACK: If we wrote `key={inx}` for this iterator, React's diff
       * algorithm would lose track of which step has changed (and
       * sometimes even mix up the state of completely different steps).
       * To get around this, we add a `uuid` property to Steps that
       * is guaranteed to be unique and allows React to diff the list
       * correctly.
       */
      let wow = (step as any).uuid || inx;
      return <div key={wow}>
        <DropArea callback={onDrop(dispatch as dispatcher, inx)} />
        <StepDragger dispatch={dispatch}
          step={step}
          ghostCss="step-drag-ghost-image-big"
          intent="step_move"
          draggerId={inx}>
          <Step step={step}
            index={inx}
            dispatch={dispatch}
            sequence={sequence}
            all={sequences}
            current={arr[inx]}
            tools={tools} />
        </StepDragger>
      </div>;
    })}
  </div>;
};

let handleNameUpdate = (dispatch: Function) =>
  (event: React.SyntheticEvent<HTMLInputElement>) => {
    let name: string = (event.currentTarget).value || "";
    dispatch(editCurrentSequence({ name }));
  };

let save = function (dispatch: Function, sequence: TaggedSequence) {
  return (e: React.SyntheticEvent<HTMLButtonElement>) => {
    dispatch(saveSequence(sequence));
  };
};

let copy = function (dispatch: Function, sequence: TaggedSequence) {
  return (e: React.SyntheticEvent<HTMLButtonElement>) =>
    dispatch(copySequence(sequence.body));
};

let destroy = function (dispatch: Function, sequence: TaggedSequence) {
  if (sequence) {
    return () => dispatch(deleteSequence(sequence.uuid));
  } else {
    return _.noop;
  }
};

export let performSeq = (dispatch: Function, s: TaggedSequence) => {
  return () => {
    dispatch(saveSequence(s))
      .then(() => execSequence(s.body));
  };
};

export class SequenceEditorMiddleActive extends React.Component<ActiveMiddleProps, {}> {
  render() {
    let { sequences, dispatch, tools, sequence } = this.props;
    let fixThisToo = function (key: string) {
      let xfer = dispatch(stepGet(key)) as DataXferObj;
      if (xfer.draggerId === NULL_DRAGGER_ID) {
        dispatch(pushStep(xfer.value));
      } else {
        let from = xfer.draggerId;
        // Remove it from where it was.
        dispatch(removeStep(from));
        // Push it to the end.
        dispatch(pushStep(xfer.value));
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
          onClick={save(dispatch, sequence)}>
          {t("Save")} {sequence && sequence.body.dirty && "*"}
        </button>
        <button className="orange button-like"
          onClick={performSeq(dispatch, sequence)}>
          {t("Save & Run")}
        </button>
        <button className="red button-like"
          onClick={destroy(dispatch, sequence)}>
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
              onCommit={handleNameUpdate(dispatch)} />
          </Col>
          <ColorPicker current={sequence.body.color}
            onChange={(color) => {
              dispatch(editCurrentSequence(
                { color }
              ));
            }} />
        </Row>
        {<DynamicallyLoadedStepList />}
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
