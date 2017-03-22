import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import { selectAllSequences, selectAllTools, findSequence } from "../resources/selectors";

export function mapStateToProps(props: Everything): Props {
  let sequence = (props.sequences.current) ?
    findSequence(props.resources.index, props.sequences.current) : undefined;

  return {
    dispatch: props.dispatch,
    sequences: selectAllSequences(props.resources.index),
    tools: selectAllTools(props.resources.index),
    sequence: sequence,
    auth: props.auth
  };
}
