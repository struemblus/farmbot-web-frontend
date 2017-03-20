import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import { selectAll } from "../resources/util";
import { history } from "../history";

export function mapStateToProps(props: Everything): Props {
  return {
    dispatch: props.dispatch,
    designer: props.designer,
    points: selectAll(props.resources.points),
    plants: selectAll(props.resources.plants),
    // TODO: This is definitely not right, figure out query objects
    species: history.getCurrentLocation().pathname.split("/")[5]
      || "No species in the URL?",
    pathname: history.getCurrentLocation().pathname
  };
}

