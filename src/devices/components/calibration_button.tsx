import * as React from "react";
import { t } from "i18next";
import { devices } from "../../device";
import { CalibrationButtonProps, Axis, HardwareState, Xyz } from "../interfaces";
import { McuParams } from "farmbot/dist";

function calibrate(axis: Axis) {
  devices
    .current
    .calibrate({ axis });
}

interface ButtonProps extends CalibrationButtonProps {
  isDisabled: boolean;
}

export function CalibrationButton({ axis, isDisabled }: ButtonProps) {
  return <button className="yellow"
    disabled={isDisabled}
    onClick={() => calibrate(axis)}>
    {t("CALIBRATE {{axis}}", { axis })}
  </button>;
};

interface CalibrationRowProps {
  hardware: McuParams;
}

export function CalibrationRow(input: CalibrationRowProps) {
  let h = input.hardware
    , rows: [Xyz, boolean][] = [
      ["x", !!(h.encoder_enabled_x || h.movement_enable_endpoints_x)],
      ["y", !!(h.encoder_enabled_y || h.movement_enable_endpoints_y)],
      ["z", !!(h.encoder_enabled_z || h.movement_enable_endpoints_z)]
    ];
  return <tr>
    <td>
      <label>{t("CALIBRATION")}</label>
    </td>
    {rows.map((row) => {
      return <td key={row[0]}>
        <CalibrationButton axis={row[0]} isDisabled={row[1]} />
      </td>
    })}
  </tr>;
}
