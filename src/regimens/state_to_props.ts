import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import { selectAllSequences, selectAllRegimens, getRegimenByUUID } from "../resources/selectors";
import { isTaggedRegimen, TaggedRegimen } from "../resources/tagged_resources";

export function mapStateToProps(props: Everything): Props {
  let uuid = props.regimens.current;
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
  return {
    dispatch: props.dispatch,
    sequences: selectAllSequences(props.resources.index),
    bulkScheduler: props.bulkScheduler,
    auth: props.auth,
    bot: props.bot,
    current,
    regimens: selectAllRegimens(props.resources.index)
  };
}

