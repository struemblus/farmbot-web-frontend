/** Like Dictionary<T>, except more cautious about null values. */
import { Sequence } from "../sequences/interfaces";
import { Regimen, RegimenItem } from "../regimens/interfaces";
import { Plant, Point, FarmEvent } from "../farm_designer/interfaces";
import { ToolBay, ToolSlot, Tool } from "../tools/interfaces";
import { Image } from "../images/index";
import { Log } from "../interfaces";
import { CowardlyDictionary } from "../util";

/** A REST resource, indexed by it's `id` attribute. */
export interface IndexedResource<T> {
  all: number[];
  byId: CowardlyDictionary<T>;
}

export interface RestResources {
  /** Tells you if the sync finished yet. */
  loaded: boolean;
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
