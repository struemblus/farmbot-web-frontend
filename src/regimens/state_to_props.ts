import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import { selectAll } from "../resources/util";
import { selectAllSequences, selectAllRegimens } from "../resources/selectors";

export function mapStateToProps(props: Everything): Props {

  return {
    dispatch: props.dispatch,
    sequences: selectAllSequences(props.resources.index),
    bulkScheduler: props.bulkScheduler,
    auth: props.auth,
    bot: props.bot,
    current: props.regimens.current,
    regimens: selectAllRegimens(props.resources.index),
    unsavedChanges: !!(!props.regimens.current.id ||
      props.regimens.current.dirty)
  };
}

