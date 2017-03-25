/** Like Dictionary<T>, except more cautious about null values. */
import { SequenceReducerState } from "../sequences/interfaces";
import { RegimensState } from "../regimens/interfaces";
import { DesignerState } from "../farm_designer/interfaces";
import { CowardlyDictionary } from "../util";
import { TaggedResource, ResourceName } from "./tagged_resources";
import { Dictionary } from "farmbot/dist";

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
