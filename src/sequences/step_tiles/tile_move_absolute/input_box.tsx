import * as React from "react";
import { Col } from "../../../ui/index";
import { BlurableInput } from "../../../ui/blurable_input";
import { InputBoxProps } from "./interfaces";

export function InputBox(p: InputBoxProps) {
  return <Col xs={3}>
    <label>
      {p.children}
    </label>
    <BlurableInput
      disabled={!!p.disabled}
      onCommit={p.onCommit}
      type="number"
      name={p.name}
      value={p.value} />
  </Col>;
}
