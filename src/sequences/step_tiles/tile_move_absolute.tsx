import * as React from "react";
import { Component } from "react";
import { StepParams } from "./index";
import { StepTitleBar } from "./step_title_bar";
import { Help, FBSelect, BlurableInput, DropDownItem } from "../../ui";
import { copy, remove } from "./index";
import { MoveAbsState } from "../interfaces";
import { t } from "i18next";
import { updateMoveAbsStep } from "../actions";
import { MoveAbsolute, Vector3 } from "farmbot";
import { mapStateToProps, TileMoveAbsoluteProps } from "./state_to_props/tile_move_absolute";
import { connect } from "react-redux";
import { Everything } from "../../interfaces";

/** Adds more specificity to the `StepParams` interface, since we only deal with
 *  MoveAbsolute nodes. */
interface MoveAbsProps extends TileMoveAbsoluteProps, StepParams {
  step: MoveAbsolute;
}

@connect(mapStateToProps)
export class TileMoveAbsolute extends Component<MoveAbsProps, MoveAbsState> {
  constructor() {
    super();
    this.update = this.update.bind(this);
    this.updateSelect = this.updateSelect.bind(this);
    this.state = {
      options: [],
      value: "---", x: 0, y: 0, z: 0, speed: 0
    };
  }
  componentWillMount() {
    debugger;
  }
  componentDidMount() {
    let step = this.props.step;
  }

  updateSelect(event: Partial<MoveAbsState>) {
    let { x, y, z, value } = event;
    this.setState({ x, y, z, value, options: this.state.options }, () => {
      this.props.dispatch(updateMoveAbsStep(this.state, this.props.index));
    });
  }

  update(event: React.SyntheticEvent<HTMLInputElement>) {
    let { name, value } = event.currentTarget;
    let state: { [name: string]: string | number } = {};
    state[name] = parseInt(value);
    this.setState(state, () => {
      this.props.dispatch(updateMoveAbsStep(this.state, this.props.index));
    });
  }

  computeDropdownOptions = (): DropDownItem[] => {
    return [];
  }

  render() {
    let { update, updateSelect } = this;
    let { index, step, dispatch } = this.props;
    let isTool = this.state.value !== "---";
    let x = this.state.x || "0";
    let y = this.state.y || "0";
    let z = this.state.z || "0";
    let speed = this.state.speed || "0";
    let selectValue: DropDownItem = { label: "", value: "" };
    let options = this.computeDropdownOptions();

    return <div>
      <div className="step-wrapper">
        <div className="row">
          <div className="col-sm-12">
            <div className="step-header move-absolute-step">
              <StepTitleBar index={index}
                dispatch={dispatch}
                step={step} />
              <i className="fa fa-arrows-v step-control" />
              <i className="fa fa-clone step-control"
                onClick={() => copy({ dispatch, step })} />
              <i className="fa fa-trash step-control"
                onClick={() => remove({ dispatch, index })} />
              <Help text={(`The Move Absolute step instructs
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
                                FarmBot do the math for you.`)} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="step-content move-absolute-step">
              <div className="row">
                <div className="col-md-12">
                  <label>
                    {t("Import coordinates from")}
                  </label>
                  <FBSelect
                    list={options}
                    onChange={updateSelect}
                    initialValue={selectValue}
                  />
                </div>
                <div className="col-xs-3 col-md-3">
                  <label>{t("X (mm)")}</label>
                  <BlurableInput
                    value={x.toString()}
                    onCommit={update}
                    type="number"
                    name="x"
                    disabled={isTool} />
                </div>
                <div className="col-xs-3 col-md-3">
                  <label>{t("Y (mm)")}</label>
                  <BlurableInput
                    value={y.toString()}
                    onCommit={update}
                    type="number"
                    name="y"
                    disabled={isTool} />
                </div>
                <div className="col-xs-3 col-md-3">
                  <label>{t("Z (mm)")}</label>
                  <BlurableInput
                    value={z.toString()}
                    onCommit={update}
                    type="number"
                    name="z"
                    disabled={isTool} />
                </div>
                <div className="col-xs-3 col-md-3">
                  <label>{t("Speed")}</label>
                  <BlurableInput
                    onCommit={update}
                    value={speed.toString()}
                    type="number"
                    name="speed" />
                </div>
                <div className="col-xs-3 col-md-3">
                  <label>{t("X-Offset")}</label>
                  <BlurableInput
                    onCommit={update}
                    value={step.args.offset.args.x.toString()}
                    type="number"
                    name="offsetX" />
                </div>
                <div className="col-xs-3 col-md-3">
                  <label>{t("Y-Offset")}</label>
                  <BlurableInput
                    onCommit={update}
                    value={step.args.offset.args.y.toString()}
                    type="number"
                    name="offsetY" />
                </div>
                <div className="col-xs-3 col-md-3">
                  <label>{t("Z-Offset")}</label>
                  <BlurableInput
                    onCommit={update}
                    value={step.args.offset.args.z.toString()}
                    type="number"
                    name="offsetZ" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}
