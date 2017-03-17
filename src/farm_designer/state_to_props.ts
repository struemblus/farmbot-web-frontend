import { Everything } from "../interfaces";
import { Props } from "./interfaces";

export function mapStateToProps(props: Everything): Props {
  let dispatch = props.dispatch;
  let sync = props.sync;
  let designer = props.designer;

  return {
    dispatch,
    sync,
    designer
  };
}

