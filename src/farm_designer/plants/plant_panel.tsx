import * as React from "react";
import { t } from "i18next";
import { formattedPlantInfo } from "./map_state_to_props";

interface PlantPanelProps {
  info: formattedPlantInfo;
}
export function PlantPanel({ info }: PlantPanelProps) {
  return <div className="panel-content">
    <label>{t("Plant Info")}</label>
    <ul>
      <li>{t("Started")}: {info.plantedAt}</li>
      <li>{t("Age")}: {info.daysOld}</li>
      <li>{t("Location")}: ({info.x}, {info.y})</li>
    </ul>
  </div>;
}
