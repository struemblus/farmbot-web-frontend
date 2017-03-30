import { ResourceName } from "./tagged_resources";
import { uuid } from "farmbot/dist";
import { joinKindAndId } from "./reducer";

export function generateUuid(id: number | undefined, kind: ResourceName) {
  return `${joinKindAndId(kind, id)}.${uuid()}`
}
