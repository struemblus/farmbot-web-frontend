import { ResourceIndex } from "./interfaces";
import { ResourceName, TaggedResource } from "./tagged_resources";
import { isUndefined } from "util";

export function selectAll(index: ResourceIndex, name: ResourceName): TaggedResource[] {
  return _(index.byKind[name])
    .map(uuid => index.references[uuid])
    .filter(tr => !isUndefined(tr))
    .sortBy("created_at")
    .value() as TaggedResource[];
}
