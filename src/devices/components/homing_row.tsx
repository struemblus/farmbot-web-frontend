import * as React from "react";
import { t } from "i18next";
import { devices } from "../../device";
import { Axis } from "../interfaces";
import { Farmbot, McuParams } from "farmbot/dist";
import { LockableButton } from "./lockable_button";
import { axisTrackingStatus } from "./axis_tracking_status";
import { ToolTips } from "../../constants";

const speed = Farmbot.defaults.speed;
let findHome = (axis: Axis) => devices.current.findHome({ speed, axis });

/*export function HomingButton({ axis }: CalibrationButtonProps) {
  return <button className="yellow" onClick={() => findHome(axis)}>
    {t("HOME {{axis}}", { axis })}
  </button>;
};*/

interface HomingRowProps {
  hidden?: boolean | undefined;
  hardware: McuParams;
}

export function HomingRow(props: HomingRowProps) {
  let { hardware, hidden } = props;

  return <tr hidden={!!hidden}>
    <td>
      <label>{t("HOMING")}</label>
      <div className="help">
        <i className="fa fa-question-circle help-icon" />
        <div className="help-text">
          {t(ToolTips.HOMING)}
        </div>
      </div>
    </td>
    {axisTrackingStatus(hardware)
      .map((row) => {
        let { axis, disabled } = row;
        return <td key={axis}>
          <LockableButton disabled={disabled} onClick={() => findHome(axis)}>
            {t("HOME {{axis}}", { axis })}
          </LockableButton>
        </td>
      })}
  </tr>;
}
