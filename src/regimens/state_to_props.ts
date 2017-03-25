import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import { selectAllSequences, selectAllRegimens, getRegimenByUUID } from "../resources/selectors";
import { isTaggedRegimen, TaggedRegimen } from "../resources/tagged_resources";

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
  console.warn("Dont pass entire bot state to child component here: ");
  return {
    dispatch: props.dispatch,
    sequences: selectAllSequences(props.resources.index),
    resources: props.resources.index,
    auth: props.auth,
    current,
    regimens: selectAllRegimens(props.resources.index),
    selectedSequence: undefined,
    dailyOffsetMs: 100,
    weeks: [],
    bot: props.bot
  };
}
