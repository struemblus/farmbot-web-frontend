import { Everything } from "../interfaces";
import { WeedDetectorProps } from "../devices/interfaces";
import { selectAllImages } from "../resources/selectors";

export function mapStateToProps(props: Everything): WeedDetectorProps {
  return {
    bot: props.bot,
    dispatch: props.dispatch,
    images: selectAllImages(props.resources.index)
  };
}

