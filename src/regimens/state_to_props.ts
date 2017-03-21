import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import { selectAll } from "../resources/util";

export function mapStateToProps(props: Everything): Props {

  return {
    dispatch: props.dispatch,
    sequences: selectAll(props.resources.sequences),
    bulkScheduler: props.bulkScheduler,
    auth: props.auth,
    bot: props.bot,
    current: props.regimens.current,
    regimens: selectAll(props.resources.regimens),
    unsavedChanges: !!(!props.regimens.current.id ||
      props.regimens.current.dirty)
  };
}

