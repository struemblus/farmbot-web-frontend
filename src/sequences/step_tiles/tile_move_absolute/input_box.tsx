import * as React from "react";
import { Col } from "../../../ui/index";
import { BlurableInput } from "../../../ui/blurable_input";

interface InputBoxProps {
  onCommit(e: React.SyntheticEvent<HTMLInputElement>): void;
  children?: JSX.Element;
  disabled?: boolean;
  name: string;
  value: string;
}

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
