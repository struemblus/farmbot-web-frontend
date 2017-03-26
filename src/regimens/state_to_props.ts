import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import {
  selectAllSequences,
  selectAllRegimens,
  maybeGetSequence,
  maybeGetRegimen
} from "../resources/selectors";

export function mapStateToProps(props: Everything): Props {
  let { resources } = props;
  let { regimens } = resources.consumers;

  return {
    dispatch: props.dispatch,
    sequences: selectAllSequences(resources.index),
    resources: resources.index,
    auth: props.auth,
    current: maybeGetRegimen(resources.index, regimens.currentRegimen),
    regimens: selectAllRegimens(resources.index),
    selectedSequence: maybeGetSequence(resources.index,
      regimens.selectedSequenceUUID),
    dailyOffsetMs: regimens.dailyOffsetMs,
    weeks: regimens.weeks,
    bot: props.bot
  };
}
