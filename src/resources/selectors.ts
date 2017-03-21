import { ResourceIndex } from "./interfaces";
import { joinKindAndId } from "./reducer";
import { ResourceName, TaggedFarmEvent, TaggedResource } from "./tagged_resources";
import { selectAll } from "./util";

export let findUuid = (index: ResourceIndex, kind: ResourceName, id: number) => {
    return index.byKindAndId[joinKindAndId(kind, id)];
}

export function findResourceById(index: ResourceIndex, kind: ResourceName,
  id: number) {
  let uuid = findUuid(index, kind, id);
  return uuid && index.references[uuid];
}

export let isKind = (name: ResourceName) =>
(tr: TaggedResource) => tr.kind === name;

function findAll(index: ResourceIndex, name: ResourceName) {
  return selectAll(index, name).filter(isKind(name));
}

export function selectAllFarmEvents(index: ResourceIndex) {
    return findAll(index, "farm_events") as TaggedFarmEvent[];
}
