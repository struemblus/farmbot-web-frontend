import * as React from "react";
import { startEditing, startControlling, saveAll } from "./actions";
import { t } from "i18next";
import * as _ from "lodash";
import { WidgetHeader } from "../../ui/index";
import { TitleBarProps } from "../interfaces";

export function TitleBar(props: TitleBarProps) {
  if (props.peripherals.editorMode === "editing") {
    return <TitleBarEditing
      dispatch={props.dispatch}
      peripherals={props.peripherals} />;
  } else {
    return <TitleBarControlling
      dispatch={props.dispatch}
      peripherals={props.peripherals} />;
  };
}

function TitleBarEditing(props: TitleBarProps) {
  let dirty = _.where(props.peripherals.all, { dirty: true }).length;

  return <WidgetHeader title="Peripherals"
    helpText={`Use these toggle switches to control FarmBot's peripherals in 
      realtime. To edit and create new peripherals, press the EDIT button. Make 
      sure to turn things off when you're done!`}>
    <button
      className="gray button-like"
      type="button"
      onClick={() => props.dispatch(startControlling())}>
      {t("BACK")}
    </button>
    <button
      hidden={!dirty}
      className="green button-like"
      type="button"
      onClick={() => props.dispatch(saveAll())}>
      {t("SAVE*")}
    </button>
  </WidgetHeader>;
}

function TitleBarControlling(props: TitleBarProps) {
  return <WidgetHeader title="Peripherals"
    helpText={`Use these toggle switches to control FarmBot's peripherals in 
      realtime. To edit and create new peripherals, press the EDIT button. Make 
      sure to turn things off when you're done!`}>
    <button
      className="gray button-like"
      type="button"
      onClick={() => props.dispatch(startEditing())}>
      {t("EDIT")}
    </button>
  </WidgetHeader>;
}
