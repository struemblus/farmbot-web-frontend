import { ResourceIndex } from "./interfaces";
import { ResourceName, TaggedResource } from "./tagged_resources";
import { betterCompact } from "../util";
import { uuid } from "farmbot/dist";
import { joinKindAndId } from "./reducer";

export function selectAll(index: ResourceIndex, name: ResourceName): TaggedResource[] {
  return betterCompact(index.byKind[name].map(uuid => index.references[uuid]));
}

export function generateUuid(id: number | undefined, kind: ResourceName) {
  return `${joinKindAndId(kind, id)}.${uuid()}`
}
