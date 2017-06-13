import * as React from "react";
import { t } from "i18next";
import { DangerZoneProps } from "../interfaces";
import { Row, Col } from "../../../ui/index";
import { Header } from "./Header";

export function DangerZone(props: DangerZoneProps) {

  let { hidePanel, dispatch, bot, onReset } = props;
  let { danger_zone } = bot.controlPanelState;

  return <div>
    <Header
      bool={danger_zone}
      title={"Danger Zone"}
      name={"danger_zone"}
      dispatch={dispatch}
    />
    <div hidden={hidePanel}>
      <Row>
        <Col xs={4}>
          <label>{t("Reset hardware parameter defaults")}</label>
        </Col>
        <Col xs={6}>
          <p>
            {t(`Restoring hardware parameter defaults will destroy the
                current settings, resetting them to default values.`)}
            <br />
            <b>{t("Will reboot device.")}</b>
          </p>
        </Col>
        <Col xs={2}>
          <button className="red" onClick={onReset}>
            {t("RESET")}
          </button>
        </Col>
      </Row>
    </div>
  </div>;
}
