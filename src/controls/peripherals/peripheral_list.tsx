import * as React from "react";
import { t } from "i18next";
import { ToggleButton } from "../toggle_button";
import { pinToggle } from "../../devices/actions";
import { Pin } from "farmbot";
import { BlurableInput, Row, Col } from "../../ui";
import { PeripheralListProps } from "./interfaces";

export function PeripheralList(props: PeripheralListProps) {
  return <div>
    {props.peripherals.map(p => {
      <Row>
        <Col xs={4}>
          <label>{p.body.label}</label>
        </Col>
        <Col xs={4}>
          <p>{p.body.pin}</p>
        </Col>
        <Col xs={4}>
          <ToggleButton
            toggleval={p.body.pin}
            toggleAction={() => pinToggle(p.body.pin)} />
        </Col>
      </Row>
    })}
  </div>
};