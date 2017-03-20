import { Dictionary } from "farmbot/dist";
import { Regimen, RegimenItem } from "../regimens/interfaces";
import { ResourceById } from "./interfaces";

const OH_NO = `Something in the application is referencing a resource ID that no
longer exists. Make sure that you are cleaning up resource IDs after deletion
and adding new ones as they are created.`;

export function indexRegimenItems(input: Regimen[]) {
  let byId = _(input)
    .map(x => x.regimen_items)
    .flatten()
    .uniq()
    .map(x => x)
    .indexBy("id")
    .value() as Dictionary<RegimenItem>;
  let all = Object.keys(byId).map(x => parseInt(x));
  return { all, byId };
}

export let indexById = <T>(input: T[]) => ({
  all: _.pluck(input, "id"),
  byId: _.indexBy(input, "id")
});

export function selectAll<T>(input: ResourceById<T>): T[] {
  return input
    .all
    .sort()
    .map(id => input.byId[id] as T)
    .map(t => (t || console.warn(OH_NO)))
    .filter(x => !_.isUndefined(x));
}
