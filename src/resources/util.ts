import { ResourceIndex } from "./interfaces";
import { ResourceName, TaggedResource } from "./tagged_resources";
import { betterCompact } from "../util";
import { uuid } from "farmbot/dist";

export function selectAll(index: ResourceIndex, name: ResourceName): TaggedResource[] {
  return betterCompact(index.byKind[name].map(uuid => index.references[uuid]));
}

export function descriptiveUUID(id: number | undefined, kind: ResourceName) {
  return `${kind}.${id || 0}.${uuid()}`
}
