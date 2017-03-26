import * as React from "react";
import { t } from "i18next";
import { AddRegimenProps } from "../interfaces";
import { TaggedRegimen } from "../../resources/tagged_resources";
import { init } from "../../api/crud";
import { randomColor } from "../../util";

export function AddRegimen(props: AddRegimenProps) {
  props.className ? props.className : "";
  let classes = "green button-like " + props.className;
  let { dispatch } = props;
  return <button className={classes}
    onClick={() => dispatch(init(emptyRegimen()))}>
    {props.children || t("Add")}
  </button>;
}
let copy = 1;
function emptyRegimen(): TaggedRegimen {
  return {
    kind: "regimens",
    uuid: "NEVER",
    dirty: true,
    body: {
      name: ("New regimen " + copy++),
      color: randomColor(),
      regimen_items: []
    }
  }
}
