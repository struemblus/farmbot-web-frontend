import * as React from "react";
import { RegimenListItemProps, Regimen } from "../interfaces";
import { randomColor, isMobile } from "../../util";
import { selectRegimen } from "../actions";
import { Link } from "react-router";

export function RegimenListItem({ regimen,
  dispatch,
  index }: RegimenListItemProps) {
  let color = (regimen && regimen.color) || randomColor();
  let style = `block block-wrapper full-width text-left ${color}-block
        block-header`;

  if (!isMobile() && regimen) {
    return <button className={style}
      onClick={select(dispatch, regimen)}>
      {(regimen && regimen.name) || "??"}{
        (regimen && regimen.dirty) ? "*" : ""}
      <i className="fa fa-pencil block-control" />
    </button>;
  } else {
    let link = (regimen && regimen.name) ?
      regimen.name.replace(/ /g, "_").toLowerCase() : "SomethingWentWrong";
    let name = (regimen && regimen.name) ?
      regimen.name + (regimen.dirty ? "*" : "") : "SomethingWentWrong";
    let key = (regimen && regimen.id) ? regimen.id : index;

    return <Link
      to={`/app/regimens/${link}`}
      key={key}
      onClick={regimen && select(dispatch, regimen)}
      className={style}>
      {name}
    </Link>;
  }
}

function select(dispatch: Function, regimen: Regimen) {
  return (event: React.MouseEvent<{}>) => dispatch(selectRegimen(regimen));
}
