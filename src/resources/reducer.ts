import { Dictionary } from "farmbot/dist";
import { Sequence } from "../sequences/interfaces";
import { Regimen, RegimenItem } from "../regimens/interfaces";
import { generateReducer } from "../redux/generate_reducer";
import { Sync, Log } from "../interfaces";
import { FarmEvent, Plant, Point } from "../farm_designer/interfaces";
import { User } from "../auth/interfaces";
import { Peripheral } from "../controls/peripherals/interfaces";
import { ToolBay, ToolSlot, Tool } from "../tools/interfaces";
import { Image } from "../images/interfaces";

/** Like Dictionary<T>, except more cautious about null values. */
export type CowardlyDictionary<T> = Dictionary<T | undefined>;

/** A REST resource, indexed by it's `id` attribute. */
interface IndexedResource<T> { all: number[]; byId: CowardlyDictionary<T>; }

export interface RestResources {
  sequences: IndexedResource<Sequence>;
  regimens: IndexedResource<Regimen>;
  farm_events: IndexedResource<FarmEvent>;
  plants: IndexedResource<Plant>;
  tool_bays: IndexedResource<ToolBay>;
  tool_slots: IndexedResource<ToolSlot>;
  tools: IndexedResource<Tool>;
  images: IndexedResource<Image>;
  points: IndexedResource<Point>;
  regimen_items: IndexedResource<RegimenItem>;
  logs: IndexedResource<Log>;
};

/** When you need an empty index because syncing has yet to complete. */
let emptyIndex = () => ({ all: [], byId: {} });

let initialState: RestResources = {
  sequences: emptyIndex(),
  regimens: emptyIndex(),
  regimen_items: emptyIndex(),
  farm_events: emptyIndex(),
  plants: emptyIndex(),
  tool_bays: emptyIndex(),
  tool_slots: emptyIndex(),
  tools: emptyIndex(),
  images: emptyIndex(),
  points: emptyIndex(),
  logs: emptyIndex(),
}

/** Responsible for all RESTful resources. */
export let resourceReducer = generateReducer<RestResources>(initialState)
  .add<Sync>("FETCH_SYNC_OK", function (state, action) {
    let p = action.payload;
    p.regimens.map(x => x.regimen_items)
    return _.merge(state, {
      sequences: indexById(p.sequences),
      regimens: indexById(p.regimens),
      farm_events: indexById(p.farm_events),
      plants: indexById(p.plants),
      tool_bays: indexById(p.tool_bays),
      tool_slots: indexById(p.tool_bays),
      tools: indexById(p.tools),
      images: indexById(p.images),
      points: indexById(p.points),
      regimen_items: indexRegimenItems(p.regimens)
    });
  });

function indexRegimenItems(input: Regimen[]) {
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
let indexById = <T>(input: T[]) => ({
  all: _.pluck(input, "id"),
  byId: _(input).indexBy("id").sortBy().value()
});
