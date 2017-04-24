import * as React from "react";

export function ToolBayHeader(props: {}) {
  return <Row>
    <Col xs={2}>
      <label>{t("Slot")}</label>
    </Col>
    <Col xs={2}>
      <label>{t("X")}</label>
    </Col>
    <Col xs={2}>
      <label>{t("Y")}</label>
    </Col>
    <Col xs={2}>
      <label>{t("Z")}</label>
    </Col>
    <Col xs={4}>
      <label>{t("Tool")}</label>
    </Col>
  </Row>;
}
