import { Dictionary } from "farmbot/dist";
import { Regimen, RegimenItem } from "../regimens/interfaces";
import { IndexedResource } from "./interfaces";

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
  byId: _(input).indexBy("id").sortBy().value()
});

export function selectAll<T>(input: IndexedResource<T>): T[] {
  return Object.values(input);
}
