import * as React from "react";
import { isMobile } from "../../util";
import { selectRegimen } from "../actions";
import { Link } from "react-router";
import { TaggedRegimen, isTaggedRegimen } from "../../resources/tagged_resources";
import { RegimenItemCalendarRow, CalendarRow } from "../interfaces";

export function RegimenListItem(props: RegimenItemCalendarRow) {
  let { color, dispatch, name, dirty } = props;
  let style = `block block-wrapper full-width
    text-left ${color}-block block-header`;

  if (!isMobile()) {
    return <button className={style}
      onClick={select(dispatch, regimen)}> {name || "??"}{(dirty) ? "*" : ""}
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
