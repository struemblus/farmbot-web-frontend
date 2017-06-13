import * as React from "react";
import { t } from "i18next";
import { Row, Col } from "../../../ui/index";

interface SpacePanelHeaderProps {
  children?: JSX.Element | undefined;
  hidden?: boolean;
}

export function SpacePanelHeader({ children, hidden }: SpacePanelHeaderProps) {
  return <Row>
    <Col xs={4}>
      <label>
        {t("X AXIS")}
      </label>
    </Col>
    <Col xs={4}>
      <label>
        {t("Y AXIS")}
      </label>
    </Col>
    <Col xs={4}>
      <label>
        {t("Z AXIS")}
      </label>
    </Col>
    <label>
      [&nbsp;<i className={`fa fa-iconString`} />&nbsp;]&nbsp;
      {children}
    </label>
  </Row>
}
