import * as React from "react";
import { SequenceEditorMiddleProps } from "./interfaces";
import { isTaggedSequence } from "../resources/tagged_resources";
import { SequenceEditorMiddleInactive } from "./sequence_editor_middle_inactive";

export class SequenceEditorMiddle extends React
  .Component<SequenceEditorMiddleProps, {}> {
  render() {
    let s = this.props.sequence;
    if (s && isTaggedSequence(s)) {
      return <p> Has sequence</p>;
    } else {
      return <SequenceEditorMiddleInactive />;
    }
  }
}
