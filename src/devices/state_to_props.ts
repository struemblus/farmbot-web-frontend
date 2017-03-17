import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import { selectAll } from "../resources/util";

export function mapStateToProps(props: Everything): Props {

  return {
    auth: props.auth,
    bot: props.bot,
    dispatch: props.dispatch,
    images: selectAll(props.resources.images)
  };
}

