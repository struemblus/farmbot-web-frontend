import { Dictionary } from "farmbot/dist";
import { Regimen, RegimenItem } from "../regimens/interfaces";
import { ResourceIndex } from "./interfaces";
import { ResourceName, TaggedResource } from "./tagged_resources";

export function selectAll(index: ResourceIndex, name: ResourceName): TaggedResource[] {
  return _(index.byKind[name])
    .map(uuid => index.references[uuid])
    .filter(tr => _.isUndefined(tr))
    .sortBy("created_at")
    .value() as TaggedResource[];
}
