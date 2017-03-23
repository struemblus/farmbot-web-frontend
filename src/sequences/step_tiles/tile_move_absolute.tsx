import * as React from "react";
import { Component } from "react";
import { StepParams } from "../interfaces";
import { copy, remove } from "./index";
import { MoveAbsState } from "../interfaces";
import {
  Vector3,
  Dictionary,
  SequenceBodyItem,
  Tool,
  Coordinate,
  LegalSequenceKind
} from "farmbot";
import { FBSelect, Row, Col, BlurableInput, DropDownItem } from "../../ui";
import { StepInputBox } from "../inputs/step_input_box";
import { t } from "i18next";
import { StepTitleBar } from "./step_title_bar";
import { isTaggedSequence, TaggedTool, TaggedToolSlot } from "../../resources/tagged_resources";


export class TileMoveAbsolute extends Component<StepParams, MoveAbsState> {

  get location(): Tool | Coordinate {
    // Incase we rename it later:
    const MOVE_ABSOLUTE: LegalSequenceKind = "move_absolute";
    if (this.props.step.kind === MOVE_ABSOLUTE) {
      return this.props.step.args.location;
    } else {
      throw new Error("Impossible celery node detected.")
    }
  }

  updateToolSelect = (tool: DropDownItem) => {
    let { step, index, dispatch } = this.props;
    this.changeToolSelect(step, index, dispatch, tool);
  }

  updateInputValue = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let { index, dispatch } = this.props;
    let { value, name } = e.currentTarget;
    this.changeInputValue(value, name, index, dispatch);
  }

  initialDropDownSequenceValue = () => {
    let location = this.location;
    if (location.kind === "tool") {
      let tool = this.toolById[location.args.tool_id];
      if (tool && tool.body.id) {
        return { label: tool.body.name, value: tool.body.id }
      }
    }
    return { label: "Nothing", value: 0 };
  }

  changeInputValue(value: string,
    kind: string,
    index: number,
    dispatch: Function): void {
    throw new Error("!!!");
  };

  changeToolSelect(step: SequenceBodyItem,
    index: number,
    dispatch: Function,
    tool: DropDownItem): void {
    throw new Error("!!!");
  };

  computeInputValue(kind: string, arg: string, step: SequenceBodyItem): string {
    throw new Error("!!!");
  };

  findSlotByToolId(tool_id: number): TaggedToolSlot {
    throw new Error("WOW");
  };

  get options(): DropDownItem[] {
    throw new Error("!!!")
  };

  get toolById(): Dictionary<TaggedTool> {
    throw new Error("!!!")
  };

  coord = (): Vector3 => {
    let output: Vector3 = { x: 0, y: 0, z: 0 };
    let location = this.location;
    switch (location.kind) {
      case "tool":
        let tool = this.toolById[location.args.tool_id];
        let id = tool && tool.body.id;
        let slot = tool && id && this.findSlotByToolId(id);
        if (slot) {
          output = { ...output, ...slot }
        };
        break;
      case "coordinate": output = { ...output, ...location.args }; break;
    }
    return output;
  }

  render() {
    let { step, dispatch, index, current } = this.props;
    if (current && !isTaggedSequence(current)) {
      throw new Error("HAZCON")
    }
    return <div className="step-wrapper">
      <Row>
        <Col sm={12}>
          <div className="step-header move-absolute-step">
            <StepTitleBar index={index} dispatch={dispatch} step={step} />
            <i className="fa fa-arrows-v step-control" />
            <i className="fa fa-clone step-control"
              onClick={() => copy({ dispatch, step, sequence: current })} />
            <i className="fa fa-trash step-control"
              onClick={() => remove({ dispatch, index })} />
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
                <FBSelect
                  allowEmpty={true}
                  list={this.options}
                  initialValue={this.initialDropDownSequenceValue()}
                  onChange={this.updateToolSelect} />
              </Col>
              <Col xs={3}>
                <label>
                  {t("X (mm)")}
                </label>
                <BlurableInput
                  onCommit={this.updateInputValue}
                  type="number"
                  name="location-x"
                  value={(this.coord().x || 0).toString()} />
              </Col>
              <Col xs={3}>
                <label>
                  {t("Y (mm)")}
                </label>
                <BlurableInput
                  onCommit={this.updateInputValue}
                  type="number"
                  name="location-y"
                  value={(this.coord().y || 0).toString()} />
              </Col>
              <Col xs={3}>
                <label>
                  {t("Z (mm)")}
                </label>
                <BlurableInput
                  onCommit={this.updateInputValue}
                  type="number"
                  name="location-z"
                  value={(this.coord().z || 0).toString()} />
              </Col>
              <Col xs={3}>
                <label>
                  {t("Speed")}
                </label>
                <StepInputBox
                  index={this.props.index}
                  field={"speed"}
                  step={this.props.step}
                  dispatch={this.props.dispatch} />
              </Col>
              <Col xs={3}>
                <label>
                  {t("X-Offset")}
                </label>
                <BlurableInput
                  onCommit={this.updateInputValue}
                  type="number"
                  name="offset-x"
                  value={this.computeInputValue("offset", "x", step)} />
              </Col>
              <Col xs={3}>
                <label>
                  {t("Y-Offset")}
                </label>
                <BlurableInput
                  onCommit={this.updateInputValue}
                  type="number"
                  name="offset-y"
                  value={this.computeInputValue("offset", "y", step)} />
              </Col>
              <Col xs={3}>
                <label>
                  {t("Z-Offset")}
                </label>
                <BlurableInput
                  onCommit={this.updateInputValue}
                  type="number"
                  name="offset-z"
                  value={this.computeInputValue("offset", "z", step)} />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>;
  }
}
