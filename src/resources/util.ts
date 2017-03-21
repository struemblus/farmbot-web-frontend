import { ResourceIndex } from "./interfaces";
import { ResourceName, TaggedResource } from "./tagged_resources";
import { betterCompact } from "../util";

export function selectAll(index: ResourceIndex, name: ResourceName): TaggedResource[] {
  return betterCompact(index.byKind[name].map(uuid => index.references[uuid]));
}
