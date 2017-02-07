import { OpenFarm } from "./openfarm";
import { Regimen } from "../regimens/interfaces";
import { Sequence } from "../sequences/interfaces";
import { Option } from "react-select";

export interface SelectSequenceOrRegimenProps extends Option {
  /** Used to identify checking which id in what array to match. */
  kind?: string;
}

export interface ScheduledEventProps {
  scheduledEvent: ScheduledEvent;
}

export interface FarmEvent {
  time: Date;
  desc: string;
  icon: string;
  repeat: number;
  time_unit: string;
  executable_type: string;
  executable_id: number;
};

export interface MovePlantProps {
  deltaX: number;
  deltaY: number;
  plantId: number;
}

export interface ScheduledEvent {
  time: Date;
  desc: string;
  icon: string;
};

/** OFCrop bundled with corresponding profile image from OpenFarm API. */
export interface CropLiveSearchResult {
  crop: OpenFarm.OFCrop;
  image: string;
}

export interface Plant {
  id?: number;
  dirty?: boolean | undefined;
  planted_at: string;
  img_url: string;
  name: string;
  x: number;
  y: number;
  planting_area_id: string;
  icon_url: string; // ? Maybe this will change.
  openfarm_slug: string; // ? Maybe this will change.
}

export interface Specimen {
  id: number;
  name: string;
  imgUrl: string;
}

export interface DesignerState {
  x_size: number;
  y_size: number;
  /** This causes too much data denormalization-
   *  let's just use state.sync.plants moving forward.
   */
  deprecatedPlants: Plant[];
  cropSearchQuery: string;
  cropSearchResults: CropLiveSearchResult[];
  currentSequenceOrRegimen: Partial<Sequence | Regimen | undefined>;
}

export interface Point {
  id: number;
  x: number;
  y: number;
  z: number;
  radius: number;
  created_at: string;
  meta: { [key: string]: (string | undefined) };
}
