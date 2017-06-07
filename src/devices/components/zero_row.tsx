import * as React from "react";
import { t } from "i18next";
import { devices } from "../../device";
import { Axis } from "../interfaces";
import { ToolTips } from "../../constants";

const zero = (axis: Axis) => devices.current.setZero(axis);
const AXES: Axis[] = ["x", "y", "z"];

export function ZeroButton({ axis }: { axis: Axis }) {
  return <button className="yellow" onClick={() => zero(axis)}>
    {t("zero {{axis}}", { axis })}
  </button>;
};

export function ZeroRow() {
  return <tr>
    <td>
      <label>{t("SET ZERO POSITION")}</label>
      <div className="help">
        <i className="fa fa-question-circle help-icon" />
        <div className="help-text">
          {t(ToolTips.SET_ZERO_POSITION)}
        </div>
      </div>
    </td>
    {AXES.map((axis) => {
      return <td key={axis}>
        <ZeroButton axis={axis} />
      </td>
    })}
  </tr>;
}
