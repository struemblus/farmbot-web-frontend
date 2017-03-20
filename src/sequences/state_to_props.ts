import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import { history } from "../history";

export function mapStateToProps(props: Everything): Props {

  return {
    dispatch: props.dispatch,
    sequences: props.sequences,
    tools: props.tools,
    auth: props.auth,
    // TODO: This is definitely not right, figure out query objects
    param: history.getCurrentLocation().pathname.split("/")[3]
      || "Sequences"
  };
}

