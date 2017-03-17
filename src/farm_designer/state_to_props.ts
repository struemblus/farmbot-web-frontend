import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import { selectAll } from "../resources/util";

export function mapStateToProps(props: Everything): Props {
  return {
    dispatch: props.dispatch,
    designer: props.designer,
    points: selectAll(props.resources.points)
  };
}

