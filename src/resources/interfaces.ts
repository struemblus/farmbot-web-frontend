/** Like Dictionary<T>, except more cautious about null values. */
import { Sequence } from "../sequences/interfaces";
import { Regimen, RegimenItem } from "../regimens/interfaces";
import { Plant, Point, FarmEvent } from "../farm_designer/interfaces";
import { ToolBay, ToolSlot, Tool } from "../tools/interfaces";
import { Image } from "../images/index";
import { Log } from "../interfaces";
import { CowardlyDictionary } from "../util";

/** A REST resource, indexed by it's `id` attribute. */
export interface ResourceById<T> {
  all: number[];
  byId: CowardlyDictionary<T>;
}

export interface RestResources {
  /** Tells you if the sync finished yet. */
  loaded: boolean;
  sequences: ResourceById<Sequence>;
  regimens: ResourceById<Regimen>;
  farm_events: ResourceById<FarmEvent>;
  plants: ResourceById<Plant>;
  tool_bays: ResourceById<ToolBay>;
  tool_slots: ResourceById<ToolSlot>;
  tools: ResourceById<Tool>;
  images: ResourceById<Image>;
  points: ResourceById<Point>;
  regimen_items: ResourceById<RegimenItem>;
  logs: ResourceById<Log>;
};
