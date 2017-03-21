import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import { selectAll } from "../resources/util";
import { selectAllSequences, selectAllRegimens, getRegimenByUUID } from "../resources/selectors";
import { isTaggedRegimen, TaggedRegimen } from "../resources/tagged_resources";

export function mapStateToProps(props: Everything): Props {
  let query = getRegimenByUUID(props.resources.index,
    "regimens",
    props.regimens.current);
  let current: TaggedRegimen | undefined;
  let unsavedChanges = false;
  if (isTaggedRegimen(query)) {
    current = query;
    unsavedChanges = !!(!current.body.id || current.body.dirty);
  } else {
    console.warn("THAT WAS NOT A REGIMEN!!!");
  }
  return {
    dispatch: props.dispatch,
    sequences: selectAllSequences(props.resources.index),
    bulkScheduler: props.bulkScheduler,
    auth: props.auth,
    bot: props.bot,
    current,
    regimens: selectAllRegimens(props.resources.index),
    unsavedChanges
  };
}

