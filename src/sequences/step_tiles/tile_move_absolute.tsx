import * as React from "react";
import { Component } from "react";
import { StepParams } from "./index";
import { MoveAbsState } from "../interfaces";
import { MoveAbsolute } from "farmbot";
import { mapStateToProps, TileMoveAbsoluteProps } from "./state_to_props/tile_move_absolute";
import { connect } from "react-redux";
import { FBSelect, BlurableInput } from "../../ui/index";

/** Adds more specificity to the `StepParams` interface, since we only deal with
 *  MoveAbsolute nodes. */
interface MoveAbsProps extends TileMoveAbsoluteProps, StepParams {
  step: MoveAbsolute;
}

@connect(mapStateToProps)
export class TileMoveAbsolute extends Component<MoveAbsProps, MoveAbsState> {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let todo = () => { console.log("TODO") };
    return (
      <div>
        <div>
          <div>
            <div className="step-wrapper">
              <div className="row">
                <div className="col-sm-12">
                  <div className="step-header move-absolute-step">
                    <input className="step-label" placeholder="Move Absolute" />
                    <i className="fa fa-arrows-v step-control" />
                    <i className="fa fa-clone step-control" />
                    <i className="fa fa-trash step-control" />
                    <div className="help">
                      <i className="fa fa-question-circle help-icon" />
                      <div className="help-text">The Move Absolute step instructs
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
                        FarmBot do the math for you.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="step-content move-absolute-step">
                    <div className="row">
                      <div className="col-md-12">
                        <label>Import coordinates from</label>
                        <FBSelect
                          list={this.props.dropDownItems}
                          onChange={todo}
                          initialValue={this.props.initialDropDownItem}
                        />
                      </div>
                      <div className="col-xs-3 col-md-3">
                        <label>
                          X (mm)
                        </label>
                        <BlurableInput onCommit={todo} value={"TODO"} />
                      </div>
                      <div className="col-xs-3 col-md-3">
                        <label>
                          Y (mm)
                        </label>
                        <BlurableInput onCommit={todo} value={"TODO"} />
                      </div>
                      <div className="col-xs-3 col-md-3">
                        <label>
                          Z (mm)
                        </label>
                        <BlurableInput onCommit={todo} value={"TODO"} />
                      </div>
                      <div className="col-xs-3 col-md-3">
                        <label>
                          Speed
                        </label>
                        <BlurableInput onCommit={todo} value={"TODO"} />
                      </div>
                      <div className="col-xs-3 col-md-3">
                        <label>
                          X-Offset
                        </label>
                        <BlurableInput onCommit={todo} value={"TODO"} />
                      </div>
                      <div className="col-xs-3 col-md-3">
                        <label>
                          Y-Offset
                        </label>
                        <BlurableInput onCommit={todo} value={"TODO"} />
                      </div>
                      <div className="col-xs-3 col-md-3">
                        <label>
                          Z-Offset
                        </label>
                        <BlurableInput onCommit={todo} value={"TODO"} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
