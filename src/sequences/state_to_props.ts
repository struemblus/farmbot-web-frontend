import { Everything } from "../interfaces";
import { Props } from "./interfaces";

export function mapStateToProps(props: Everything): Props {
  let dispatch = props.dispatch;
  let sequences = props.sequences;
  let tools = props.tools;
  let auth = props.auth;

  return {
    dispatch,
    sequences,
    tools,
    auth
  };
}

