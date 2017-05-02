import * as React from "react";
import { t } from "i18next";
import { additionalSettingsMenu } from "./weed_detector_config";
import { WidgetHeader } from "../ui/index";
import { ToolTips } from "../constants";

interface Props {
  onSave?(): void;
  onTest?(): void;
  onSettingToggle?(): void;
  onDeletionClick?(): void;
  onCalibrate?(): void;
  deletionProgress?: string | undefined;
  settingsMenuOpen?: boolean;
  title: string;
}

export function TitleBar({
  onSave,
  onTest,
  settingsMenuOpen,
  onSettingToggle,
  deletionProgress,
  onDeletionClick,
  onCalibrate,
  title
}: Props) {
  return <WidgetHeader helpText={ToolTips.WEED_DETECTOR} title={title}>
    <button
      hidden={!onSave}
      onClick={onSave}
      className="green">
      {t("SAVE")}
    </button>
    <button
      hidden={!onTest}
      onClick={onTest}
      className="yellow">
      {t("TEST")}
    </button>
    <button
      hidden={!onDeletionClick}
      onClick={onDeletionClick}
      className="red">
      {deletionProgress || t("CLEAR WEEDS")}
    </button>
    {/* TODO: Hook up calibration */}
    <button
      hidden={!onCalibrate}
      onClick={() => { }}
      className="green">
      {t("Calibrate")}
    </button>
    {onSettingToggle &&
      <i
        onClick={onSettingToggle}
        className="fa fa-cog" >
        {settingsMenuOpen && additionalSettingsMenu()}
      </i>
    }
  </WidgetHeader>;
}
