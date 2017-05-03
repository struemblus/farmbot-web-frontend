import * as React from "react";
import { BotProp } from "../interfaces";
import { t } from "i18next";
import { ToggleButton } from "../../controls/toggle_button";
import { checkControllerUpdates, updateConfig } from "../actions";
import { isUndefined, noop } from "lodash";

export let OsUpdateButton = ({ bot }: BotProp) => {
  let osUpdateBool = bot.hardware.configuration.os_auto_update;
  let buttonStr = "Can't Connect to bot";
  let buttonColor = "yellow";
  if (bot.currentOSVersion != undefined) {
    if (bot.currentOSVersion ===
      bot.hardware.informational_settings.controller_version) {
      buttonStr = t("UP TO DATE");
      buttonColor = "gray";
    } else {
      buttonStr = t("UPDATE");
      buttonColor = "green";
    }
  } else {
    buttonStr = "Can't Connect to release server";
  }
  let toggleVal = isUndefined(osUpdateBool) ? "undefined" : ("" + osUpdateBool);
  return <div className="updates">
    <p>
      {t("Auto Updates?")}
    </p>
    <ToggleButton toggleval={toggleVal}
      toggleAction={() => {
        let os_auto_update = !osUpdateBool ? 1 : 0;
        // TODO: This no longer needs to be a thunk
        //       since it does not change redux state.
        updateConfig({ os_auto_update })(noop);
      }} />
    <button className={buttonColor} onClick={() => checkControllerUpdates()}>
      {buttonStr}
    </button>
  </div>;
};
