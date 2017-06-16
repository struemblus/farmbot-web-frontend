import * as React from "react";
import * as _ from "lodash";
import { t } from "i18next";
import { FormattedPlantInfo } from "./map_state_to_props";

interface PlantPanelProps {
  info: FormattedPlantInfo;
  onDestroy?(uuid: string): void;
}

export function PlantPanel({ info, onDestroy }: PlantPanelProps) {
  let destroy = () => onDestroy && onDestroy(info.uuid);
  return <div className="panel-content">
    <label>{t("Plant Info")}</label>
    <ul>
      <li>
        <b>{t("Full Name")}: </b>
        <span>{_.startCase(info.name)}</span>
      </li>
      <li>
        <b>{t("Plant Type")}: </b>
        <span>{_.startCase(info.slug)}</span>
      </li>
      <li>
        <b>{t("Started")}: </b>
        <span>{info.plantedAt}</span>
      </li>
      <li>
        <b>{t("Age")}: </b>
        <span>{info.daysOld} {t("days old")}</span>
      </li>
      <li>
        <b>{t("Location")}: </b>
        <span>({info.x}, {info.y})</span>
      </li>
    </ul>
    <div>
      <label hidden={!onDestroy}>
        {t("Delete this plant")}
      </label>
    </div>
    <button className="red"
      hidden={!onDestroy}
      onClick={destroy}>
      {t("Delete")}
    </button>
  </div>;
}
