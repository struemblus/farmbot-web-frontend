import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import { selectAllSequences, selectAllTools, findSequence } from "../resources/selectors";

export function mapStateToProps(props: Everything): Props {

  return {
    dispatch: props.dispatch,
    sequences: selectAllSequences(props.resources.index),
    tools: selectAllTools(props.resources.index),
    sequence: findSequence(props.resources.index, props.sequences.current),
    auth: props.auth
  };
}
