import * as React from "react";
import { RegimenProps } from "../interfaces";
import { saveRegimen } from "../actions";
import { t } from "i18next";

interface SaveButtonProps extends RegimenProps {
  url: string;
};

function save({regimen, dispatch, url}: SaveButtonProps) {
  if (regimen) {
    let x = regimen; // TS BUG???
    return (event: React.FormEvent<{}>) => {
      dispatch(saveRegimen(x, url));
    };
  } else {
    throw new Error("Tried to save regimen, but there was no regimen.");
  };

}

export function SaveButton({regimen, dispatch, url}: SaveButtonProps) {
  if (regimen) {
    return <button className="green button-like widget-control"
      onClick={save({ dispatch, regimen, url })}>

      {t("Save") + (regimen.dirty ? "*" : "")}
    </button>;
  } else {
    return <span />;
  };
}
