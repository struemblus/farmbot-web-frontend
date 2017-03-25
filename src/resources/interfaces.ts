/** Like Dictionary<T>, except more cautious about null values. */
import { Sequence, SequenceReducerState } from "../sequences/interfaces";
import { Regimen, RegimenItem, RegimensState } from "../regimens/interfaces";
import { Plant, Point, FarmEvent, DesignerState } from "../farm_designer/interfaces";
import { ToolBay, ToolSlot, Tool } from "../tools/interfaces";
import { Image } from "../images/index";
import { Log } from "../interfaces";
import { CowardlyDictionary } from "../util";
import { TaggedResource, ResourceName } from "./tagged_resources";
import { Dictionary } from "farmbot/dist";
import { BulkSchedulerState } from "../regimens/bulk_scheduler/interfaces";

type UUID = string;

export interface ResourceIndex {
  all: UUID[];
  byKind: Record<ResourceName, UUID[]>;
  byKindAndId: CowardlyDictionary<UUID>;
  references: Dictionary<TaggedResource | undefined>;
}
export interface RestResources {
  /** Tells you if the sync finished yet. */
  loaded: boolean;
  index: ResourceIndex
  consumers: {
    sequences: SequenceReducerState;
    regimens: RegimensState;
    farm_designer: DesignerState;
  }
};
