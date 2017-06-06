import { Everything } from "../interfaces";
import { selectAllImages } from "../resources/selectors";
import { FarmwareProps } from "../devices/interfaces";

export function mapStateToProps(props: Everything): FarmwareProps {
  let images = _(selectAllImages(props.resources.index))
    .sortBy(x => x.body.id)
    .reverse()
    .value();

  let currentImage = images
    .filter(i => i.uuid === props.resources.consumers.farmware.currentImage)[0];

  return {
    bot: props.bot,
    dispatch: props.dispatch,
    currentImage,
    images
  };
}

