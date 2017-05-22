import * as React from "react";
import { Component } from "react";
import { StepParams } from "../interfaces";
import { splice, remove } from "./index";
import { MoveAbsState } from "../interfaces";
import {
  Tool,
  Coordinate,
  LegalSequenceKind,
  Point
} from "farmbot";
import {
  Row,
  Col,
  BlurableInput,
  DropDownItem,
} from "../../ui";
import { StepInputBox } from "../inputs/step_input_box";
import { t } from "i18next";
import { StepTitleBar } from "./step_title_bar";
import {
  isTaggedSequence,
  TaggedTool,
  TaggedToolSlotPointer
} from "../../resources/tagged_resources";
import {
  findToolById,
  findSlotByToolId,
  findPointerByTypeAndId
} from "../../resources/selectors";
import { defensiveClone } from "../../util";
import { overwrite } from "../../api/crud";
import { Xyz } from "../../devices/interfaces";
import { TileMoveAbsSelect } from "./tile_move_abs_select";

interface Args {
  location: Tool | Coordinate | Point;
  speed: number;
  offset: Coordinate;
}
type LocationArg = "location" | "offset";

export class TileMoveAbsolute extends Component<StepParams, MoveAbsState> {
  get resources() { return this.props.resources; }
  get step() { return this.props.currentStep; }
  get tool(): TaggedTool | undefined {
    let l = this.args.location;
    if (l && l.kind === "tool" && l.args.tool_id) {
      return findToolById(this.resources, l.args.tool_id);
    }
  }
  get tool_id() { return this.tool && this.tool.body.id; }
  get slot(): TaggedToolSlotPointer | undefined {
    return (this.tool_id) ?
      findSlotByToolId(this.resources, this.tool_id) : undefined;
  }
  get args() {
    // Incase we rename it later:
    const MOVE_ABSOLUTE: LegalSequenceKind = "move_absolute";
    if (this.step.kind === MOVE_ABSOLUTE) {
      return this.step.args;
    } else {
      throw new Error("Impossible celery node detected.");
    }
  }
  get location(): Tool | Coordinate {
    if (this.args.location.kind !== "point") {
      return this.args.location;
    } else {
      throw new Error("A `point` node snuck in. Still WIP");
    }
  }
  getOffsetValue = (val: Xyz) => {
    return (this.args.offset.args[val] || 0).toString();
  }

  updateArgs = (update: Partial<Args>) => {
    let copy = defensiveClone(this.props.currentSequence).body;
    let step = (copy.body || [])[this.props.index];
    if (step && step.kind === "move_absolute") {
      step.args = { ...step.args, ...update };
      this.props.dispatch(overwrite(this.props.currentSequence, copy));
    } else {
      throw new Error("Impossible condition.");
    }
  }

  getAxisValue = (axis: Xyz): string => {
    let number: number | undefined;
    let l = this.args.location;
    switch (l.kind) {
      case "coordinate":
        number = l.args[axis];
        break;
      case "tool":
        number = (this.slot) ? this.slot.body[axis] : undefined;
        break;
      case "point":
        let { pointer_id, pointer_type } = l.args;
        number = findPointerByTypeAndId(this.resources,
          pointer_type,
          pointer_id).body[axis];
    }
    return (number || 0).toString();
  }

  updateInputValue = (axis: Xyz, place: LocationArg) =>
    (e: React.SyntheticEvent<HTMLInputElement>) => {
      let num = parseInt(e.currentTarget.value, 10);
      let update = { [place]: { args: { [axis]: num } } };
      this.updateArgs(_.merge({}, this.args, update));
    }

  render() {
    let { currentStep, dispatch, index, currentSequence } = this.props;
    if (currentSequence && !isTaggedSequence(currentSequence)) {
      throw new Error("WHOOPS!");
    }

    return <div className="step-wrapper">
      <Row>
        <Col sm={12}>
          <div className="step-header move-absolute-step">
            <StepTitleBar index={index} dispatch={dispatch} step={currentStep} />
            <i className="fa fa-arrows-v step-control" />
            <i className="fa fa-clone step-control"
              onClick={() => dispatch(splice({
                step: currentStep,
                index,
                sequence: currentSequence
              }))} />
            <i className="fa fa-trash step-control"
              onClick={() => remove({ dispatch, index, sequence: currentSequence })} />
            <div className="help">
              <i className="fa fa-question-circle help-icon" />
              <div className="help-text">
                {t(`The Move Absolute step instructs
                FarmBot to move to the specified coordinate
                regardless of the current position. For example,
                if FarmBot is currently at X=1000, Y=1000 and it
                receives a Move Absolute where X=0 and Y=3000,
                then FarmBot will move to X=0, Y=3000. If
                FarmBot must move in multiple directions, it
                will move diagonally. If you require straight
                movements along one axis at a time, use multiple
                Move Absolute steps. Coming soon: Offsets allow
                you to more easily instruct FarmBot to move to a
                location, but offset from it by the specified
                amount. For example moving to just above where a
                peripheral is located. Using offsets lets
                FarmBot do the math for you.`)}
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <div className="step-content move-absolute-step">
            <Row>
              <Col md={12}>
                <label>Import coordinates from</label>
                <TileMoveAbsSelect
                  resources={this.resources}
                  selectedItem={this.args.location}
                  onChange={(x) => this.updateArgs({ location: x })} />
              </Col>
              <Col xs={3}>
                <label>
                  {t("X (mm)")}
                </label>
                <BlurableInput
                  onCommit={this.updateInputValue("x", "location")}
                  disabled={!!this.tool}
                  type="number"
                  name="location-x"
                  value={this.getAxisValue("x")} />
              </Col>
              <Col xs={3}>
                <label>
                  {t("Y (mm)")}
                </label>
                <BlurableInput
                  onCommit={this.updateInputValue("y", "location")}
                  type="number"
                  disabled={!!this.tool}
                  name="location-y"
                  value={this.getAxisValue("y")} />
              </Col>
              <Col xs={3}>
                <label>
                  {t("Z (mm)")}
                </label>
                <BlurableInput
                  onCommit={this.updateInputValue("z", "location")}
                  type="number"
                  name="location-z"
                  disabled={!!this.tool}
                  value={this.getAxisValue("z")} />
              </Col>
              <Col xs={3}>
                <label>
                  {t("Speed")}
                </label>
                <StepInputBox
                  field={"speed"}
                  step={this.step}
                  index={index}
                  dispatch={this.props.dispatch}
                  sequence={this.props.currentSequence} />
              </Col>
              <Col xs={3}>
                <label>
                  {t("X-Offset")}
                </label>
                <BlurableInput
                  onCommit={this.updateInputValue("x", "offset")}
                  type="number"
                  name="offset-x"
                  value={this.getOffsetValue("x")} />
              </Col>
              <Col xs={3}>
                <label>
                  {t("Y-Offset")}
                </label>
                <BlurableInput
                  onCommit={this.updateInputValue("y", "offset")}
                  type="number"
                  name="offset-y"
                  value={this.getOffsetValue("y")} />
              </Col>
              <Col xs={3}>
                <label>
                  {t("Z-Offset")}
                </label>
                <BlurableInput
                  onCommit={this.updateInputValue("z", "offset")}
                  type="number"
                  name="offset-z"
                  value={this.getOffsetValue("z")} />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>;
  }
}
