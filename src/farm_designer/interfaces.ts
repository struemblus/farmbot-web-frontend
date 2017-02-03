import { OpenFarm } from "./openfarm";

export interface MovePlantProps {
  deltaX: number;
  deltaY: number;
  plantId: number;
}

export interface FarmEvent {
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
}
