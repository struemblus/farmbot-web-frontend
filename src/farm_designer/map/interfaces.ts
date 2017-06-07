import {
  TaggedPlantPointer,
  TaggedCrop
} from "../../resources/tagged_resources";
import { State } from "../interfaces";

export interface PlantLayerProps {
  plants: TaggedPlantPointer[];
  currentPlant: TaggedPlantPointer | undefined;
  dragging: boolean;
  editing: boolean;
  visible: boolean;
  crops: TaggedCrop[];
  dispatch: Function;
}

export interface CropSpreadDict {
  [key: string]: number | undefined;
}

export interface GardenMapLegendProps {
  zoom: (value: number) => () => void;
  toggle: (property: keyof State) => () => void;
  updateBotOrigin: (quadrant: number) => () => void;
  botOrigin: number;
  zoomLvl: number;
  legendMenuOpen: boolean;
  showPlants: boolean;
  showPoints: boolean;
  showSpread: boolean;
  showFarmbot: boolean;
}
