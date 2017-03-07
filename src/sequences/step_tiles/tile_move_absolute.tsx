import * as React from "react";
import { Component } from "react";
import { StepParams } from "./index";
import { MoveAbsState } from "../interfaces";
import { MoveAbsolute } from "farmbot";
import { mapStateToProps, TileMoveAbsoluteProps } from "./state_to_props/tile_move_absolute";
import { connect } from "react-redux";

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
                        <div className="Select Select--single is-searchable has-value">
                          <div className="Select-control">
                            <span className="Select-multi-value-wrapper" id="react-select-6--value">
                              <div className="Select-value"><span className="Select-value-label" role="option" aria-selected="true" id="react-select-6--value-item">---</span></div>
                              <div className="Select-input" style={{display: 'inline-block'}}>
                                <input role="combobox" aria-expanded="false" aria-owns aria-haspopup="false" aria-activedescendant="react-select-6--value" style={{width: 5, boxSizing: 'content-box'}} />
                                <div style={{position: 'absolute', top: 0, left: 0, visibility: 'hidden', height: 0, overflow: 'scroll', whiteSpace: 'pre', fontSize: 12, fontFamily: 'Roboto, Arial, Helvetica, sans-serif', fontWeight: 'normal', fontStyle: 'normal', letterSpacing: 'normal'}} />
                              </div>
                            </span>
                            <span className="Select-clear-zone" title="Clear value" aria-label="Clear value"><span className="Select-clear">×</span></span><span className="Select-arrow-zone"><span className="Select-arrow" /></span>
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-3 col-md-3">
                        <label>
                          X (mm)
                        </label>
                        <input name="x" type="number" />
                      </div>
                      <div className="col-xs-3 col-md-3">
                        <label>
                          Y (mm)
                        </label>
                        <input name="y" type="number" />
                      </div>
                      <div className="col-xs-3 col-md-3">
                        <label>
                          Z (mm)
                        </label>
                        <input name="z" type="number" />
                      </div>
                      <div className="col-xs-3 col-md-3">
                        <label>
                          Speed
                        </label>
                        <input name="speed" type="number" />
                      </div>
                      <div className="col-xs-3 col-md-3">
                        <label>
                          X-Offset
                        </label>
                        <input name="offsetX" type="number" />
                      </div>
                      <div className="col-xs-3 col-md-3">
                        <label>
                          Y-Offset
                        </label>
                        <input name="offsetY" type="number" />
                      </div>
                      <div className="col-xs-3 col-md-3">
                        <label>
                          Z-Offset</label><input name="offsetZ" type="number" />
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
