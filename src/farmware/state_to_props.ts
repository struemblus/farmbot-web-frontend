import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import { selectAllImages } from "../resources/selectors";

export function mapStateToProps(props: Everything): Props {
  return {
    bot: props.bot,
    dispatch: props.dispatch,
    images: selectAllImages(props.resources.index)
  };
}

