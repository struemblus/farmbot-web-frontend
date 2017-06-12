import * as React from "react";
import { t } from "i18next";

interface DangerZoneProps {
  hidePanel: boolean;
  onReset(): void;
}
export function DangerZone({ hidePanel, onReset }: DangerZoneProps) {
  return <div hidden={hidePanel}>
    <h2>Danger Zone</h2>
    <table>
      <tr>
        <td>
          <label>{t("Reset hardware parameter defaults")}</label>
        </td>
        <td colSpan={2}>
          <p>
            {t(`Restoring hardware parameter defaults will destroy the
                        current settings, resetting them to default values.`)}
            &nbsp;
                  <b>{t("Will reboot device.")}</b>
          </p>
        </td>
        <td>
          <button className="red" onClick={onReset}>
            {t("RESET")}
          </button>
        </td>
      </tr>
    </table>
  </div>;
}
