import { Dictionary } from "farmbot/dist";
import { Regimen, RegimenItem } from "../regimens/interfaces";
import { ResourceIndex } from "./interfaces";
import { ResourceName, TaggedResource } from "./tagged_resources";

const OH_NO = `Something in the application is referencing a resource ID that no
longer exists. Make sure that you are cleaning up resource IDs after deletion
and adding new ones as they are created.`;

export function selectAll(index: ResourceIndex, name: ResourceName): TaggedResource[] {
  return _(index.byKind[name])
  .map(uuid => index.references[uuid])
  .filter(tr => _.isUndefined(tr))
  .sortBy("created_at")
  .value() as TaggedResource[];
}
