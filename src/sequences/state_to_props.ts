import { Everything } from "../interfaces";
import { Props } from "./interfaces";

export function mapStateToProps(props: Everything): Props {

  return {
    dispatch: props.dispatch,
    sequences: props.sequences,
    tools: props.tools,
    auth: props.auth
  };
}

