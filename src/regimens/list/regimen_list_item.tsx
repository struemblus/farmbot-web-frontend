import * as React from "react";
import { RegimenListItemProps, Regimen } from "../interfaces";
import { randomColor, isMobile } from "../../util";
import { selectRegimen } from "../actions";
import { Link } from "react-router";
import { error } from "../../ui/logger";
import { t } from "i18next";
import { TaggedRegimen, isTaggedRegimen } from "../../resources/tagged_resources";

export function RegimenListItem({ regimen,
  dispatch,
  index }: RegimenListItemProps) {
  let color = (regimen && regimen.body.color) || randomColor();
  let style = `block block-wrapper full-width text-left ${color}-block
        block-header`;

  if (!isMobile() && regimen) {
    return <button className={style}
      onClick={select(dispatch, regimen)}>
      {(regimen && regimen.body.name) || "??"}{
        (regimen && regimen.body.dirty) ? "*" : ""}
      <i className="fa fa-pencil block-control" />
    </button>;
  } else {
    let link = (regimen && regimen.body.name) ?
      regimen.body.name.replace(/ /g, "_").toLowerCase() : "SomethingWentWrong";
    let name = (regimen && regimen.body.name) ?
      regimen.body.name + (regimen.body.dirty ? "*" : "") : "SomethingWentWrong";
    let key = (regimen && regimen.body.id) ? regimen.body.id : index;

    return <Link
      to={`/app/regimens/${link}`}
      key={key}
      onClick={select(dispatch, regimen)}
      className={style}>
      {name}
    </Link>;
  }
}

function select(dispatch: Function, regimen: TaggedRegimen | undefined) {
  return function (event: React.MouseEvent<{}>) {
    if (regimen && isTaggedRegimen(regimen)) {
      dispatch(selectRegimen(regimen));
    } else {
      console.warn("No regimen ??")
    }
  };
}
