import * as React from "react";
import { StepParams } from "./index";
import { StepTitleBar } from "./step_title_bar";
import { Help, Select, BlurableInput } from "../../ui";
import { copy, remove, CustomOptionProps } from "./index";
import { SelectOptionsParams } from "../../interfaces";
import { t } from "i18next";
import { updateMoveAbsStep } from "../actions";

export function TileMoveAbsolute({dispatch, step, index, tools}: StepParams) {

    /** TODO: Hack? is this node not getting the right interface? 
    * says step.args.* does not exist. */
    let raw = step as any;
    let args = raw.args.location.args;

    let options: SelectOptionsParams[] = [
        { label: "---", value: "---" }
    ];

    tools.tools.all.map(tool => {
        tools.tool_slots.map(slot => {
            if (tool.id === slot.tool_id) {
                options.push({
                    label: tool.name,
                    value: tool.id,
                    x: slot.x,
                    y: slot.y,
                    z: slot.z
                });
            }
        });
    });

    let optionComponent = (props: CustomOptionProps) => {
        let handleMouseDown = (e: React.SyntheticEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            props.onSelect(props.option, e);
        };

        let handleMouseEnter = (e: React.SyntheticEvent<HTMLDivElement>) => {
            props.onFocus(props.option, e);
        };

        let handleMouseMove = (e: React.SyntheticEvent<HTMLDivElement>) => {
            if (props.isFocused) { return; };
            props.onFocus(props.option, e);
        };

        let { x, y, z } = props.option;

        let hasCoordinates = props.option && props.option.x;
        return (
            <div className={props.className}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}>
                {props.children}
                {hasCoordinates && (
                    <span className="Select-value-params">
                        ({x}, {y}, {z})
                    </span>
                )}
            </div>
        );
    };

    // TODO: any
    let update = (event: any) => {
        if (event.currentTarget) {
            let { name, value } = event.currentTarget;
            dispatch(updateMoveAbsStep({ name, value }, index));
        } else {
            dispatch(updateMoveAbsStep(event, index));
        }
    };

    function getToolCoords() {
        return _.findWhere(tools.tool_slots, { tool_id: args.tool_id });
    }

    let isDisabled = args.tool_id ? true : false;
    let toolId = args.tool_id ? args.tool_id : "---";
    let z = args.tool_id ? getToolCoords().z : args.z;
    let x = args.tool_id ? getToolCoords().x : args.x;
    let y = args.tool_id ? getToolCoords().y : args.y;

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
                        <Help text={(`The Move Absolute step instructs FarmBot
                      to move to the specified coordinate regardless of the 
                      current position. For example, if FarmBot is currently at 
                      X=1000, Y=1000 and it receives a Move Absolute where X=0 
                      and Y=3000, then FarmBot will move to X=0, Y=3000. If 
                      FarmBot must move in multiple directions, it will move 
                      diagonally. If you require straight movements along one
                      axis at a time, use multiple Move Absolute steps. Coming 
                      soon: Offsets allow you to more easily instruct FarmBot to 
                      move to a location, but offset from it by the specified 
                      amount. For example moving to just above where a 
                      peripheral is located. Using offsets lets FarmBot do the 
                      math for you.`)} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="step-content move-absolute-step">
                        <div className="row">
                            <div className="col-md-12">
                                <label>{t("Inherit coordinates from")}</label>
                                <Select
                                    options={options}
                                    optionComponent={optionComponent}
                                    onChange={update}
                                    value={toolId}
                                    />
                            </div>
                            <div className="col-xs-3 col-md-3">
                                <label>{t("X (mm)")}</label>
                                <BlurableInput
                                    value={x}
                                    onCommit={update}
                                    type="number"
                                    name="x"
                                    disabled={isDisabled} />
                            </div>
                            <div className="col-xs-3 col-md-3">
                                <label>{t("Y (mm)")}</label>
                                <BlurableInput
                                    value={y}
                                    onCommit={update}
                                    type="number"
                                    name="y"
                                    disabled={isDisabled} />
                            </div>
                            <div className="col-xs-3 col-md-3">
                                <label>{t("Z (mm)")}</label>
                                <BlurableInput
                                    value={z}
                                    onCommit={update}
                                    type="number"
                                    name="z"
                                    disabled={isDisabled} />
                            </div>
                            <div className="col-xs-3 col-md-3">
                                <label>{t("Speed")}</label>
                                <BlurableInput
                                    onCommit={update}
                                    value={raw.args.speed}
                                    type="number"
                                    name="speed" />
                            </div>
                            <div className="col-xs-3 col-md-3">
                                <label>{t("X-Offset")}</label>
                                <BlurableInput
                                    onCommit={update}
                                    value={raw.args.offset.args.x}
                                    type="number"
                                    name="offset-x" />
                            </div>
                            <div className="col-xs-3 col-md-3">
                                <label>{t("Y-Offset")}</label>
                                <BlurableInput
                                    onCommit={update}
                                    value={raw.args.offset.args.y}
                                    type="number"
                                    name="offset-y" />
                            </div>
                            <div className="col-xs-3 col-md-3">
                                <label>{t("Z-Offset")}</label>
                                <BlurableInput
                                    onCommit={update}
                                    value={raw.args.offset.args.z}
                                    type="number"
                                    name="offset-z" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}
