import { ResourceName } from "./tagged_resources";
// import { uuid } from "farmbot/dist";
import { joinKindAndId } from "./reducer";

var count = 0;
export function generateUuid(id: number | undefined, kind: ResourceName) {
  return `${joinKindAndId(kind, id)}.${count++}`
}

export function arrayWrap<T>(input: T|(T[])): T[] {
  return _.isArray(input) ? input : [input];
}
