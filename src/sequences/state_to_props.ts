import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import { selectAllSequences, selectAllTools, findSequence } from "../resources/selectors";
eval("window.HELP = true");
export function mapStateToProps(props: Everything): Props {
  let uuid = props.resources.consumers.sequences.current;
  return {
    dispatch: props.dispatch,
    sequences: selectAllSequences(props.resources.index),
    tools: selectAllTools(props.resources.index),
    sequence: (uuid) ? findSequence(props.resources.index, uuid) : undefined,
    auth: props.auth
  };
}
