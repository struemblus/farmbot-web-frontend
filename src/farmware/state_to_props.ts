import { Everything } from "../interfaces";
import { FarmwareProps } from "../devices/interfaces";
import { selectAllImages } from "../resources/selectors";

export function mapStateToProps(props: Everything): FarmwareProps {
  return {
    bot: props.bot,
    dispatch: props.dispatch,
    images: selectAllImages(props.resources.index)
  };
}

