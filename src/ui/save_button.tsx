import * as React from "react";
import { t } from "i18next";

interface SaveBtnProps {
  onClick: any; // TODO: Come back to this
  isDirty: boolean;
  isSaving: boolean;
  isSaved: boolean;
  dirtyText?: string;
  savingText?: string;
  savedText?: string;
}

export function SaveBtn(props: SaveBtnProps) {
  console.log(props);

  let { isDirty, isSaving, isSaved, dirtyText, savingText, savedText } = props;

  let statusClass: string;

  return <button
    onClick={props.onClick}
    className="green save-btn"
    type="button">
    {isDirty && (t(dirtyText || "Save") + " *")}
    {isSaving && (t(savingText || "Saving"))}
    {isSaved && (t(savedText || "Saved") + " ✔")}
  </button>;
}

