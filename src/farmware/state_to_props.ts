import { Everything } from "../interfaces";
import { selectAllImages } from "../resources/selectors";
import { Props } from "./interfaces";

export function mapStateToProps(props: Everything): Props {
  return {
    bot: props.bot,
    dispatch: props.dispatch,
    currentImage: props.resources.consumers.farmware.currentImage,
    images: selectAllImages(props.resources.index)
  };
}

