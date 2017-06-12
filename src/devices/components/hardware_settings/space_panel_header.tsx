import * as React from "react";
import { t } from "i18next";

interface SpacePanelHeaderProps {
  onClick(): void;
  children?: JSX.Element | undefined;
  hidden?: boolean;
}

export function SpacePanelHeader({
  onClick,
  children,
  hidden }: SpacePanelHeaderProps) {
  let iconString = hidden ? "plus" : "minus";

  return <table className="plain">
    <thead>
      <tr>
        <th width="38%" />
        <th width="20%">
          <label>{t("X AXIS")}</label>
        </th>
        <th width="20%">
          <label>{t("Y AXIS")}</label>
        </th>
        <th width="20%">
          <label>{t("Z AXIS")}</label>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <label onClick={onClick}>
            [&nbsp;
            <i className={`fa fa-${iconString}`} />
            &nbsp;]&nbsp;
            {children}
          </label>
        </td>
      </tr>
    </tbody>
  </table>
}
