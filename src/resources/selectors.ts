import { ResourceIndex } from "./interfaces";
import { joinKindAndId } from "./reducer";
import { ResourceName } from "./tagged_resources";

export let findUuid = (index: ResourceIndex, kind: ResourceName, id: number) => {
  let result = index
    .byKindAndId[joinKindAndId(kind, id)];
  if (result) {
    return result;
  } else {
    throw new Error("Could not find " + kind + " with id " + id + "in indexes.");
  }
}

export function findResourceById(index: ResourceIndex, kind: ResourceName,
  id: number) {
  let uuid = findUuid(index, kind, id);
  return uuid && index.references[uuid];
}

export function selectAllFarmEvents(index: ResourceIndex) {
    return selectAll(state.resources.index, "farm_events")
              .filter(fe => fe.kind === "farm_events") as TaggedFarmEvent[];
}
