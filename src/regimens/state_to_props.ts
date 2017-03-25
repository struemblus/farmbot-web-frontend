import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import { selectAllSequences, selectAllRegimens, getRegimenByUUID, findId, getSequenceByUUID, maybeGetSequence } from "../resources/selectors";
import { isTaggedRegimen, TaggedRegimen, TaggedSequence } from "../resources/tagged_resources";
import { ResourceIndex } from "../resources/interfaces";

export function mapStateToProps(props: Everything): Props {
  let uuid = props.resources.consumers.regimens.selectedSequenceUUID;
  let query = uuid ?
    getRegimenByUUID(props.resources.index, "regimens", uuid) : undefined;
  let current: TaggedRegimen | undefined;
  let unsavedChanges = false;
  if (query && isTaggedRegimen(query)) {
    current = query;
    unsavedChanges = !!(!current.body.id || current.body.dirty);
  } else {
    if (!_.isUndefined(query)) { console.warn("THAT WAS NOT A REGIMEN!!!"); }
  }
  let regimenState = props.resources.consumers.regimens;
  let selectedSequence = maybeGetSequence(props.resources.index,
    regimenState.selectedSequenceUUID);
  return {
    dispatch: props.dispatch,
    sequences: selectAllSequences(props.resources.index),
    resources: props.resources.index,
    auth: props.auth,
    current,
    regimens: selectAllRegimens(props.resources.index),
    selectedSequence,
    dailyOffsetMs: regimenState.dailyOffsetMs,
    weeks: regimenState.weeks,
    bot: props.bot
  };
}
