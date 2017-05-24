import {
  TaggedPlantPointer,
  TaggedCrop
} from "../../resources/tagged_resources";

export interface PlantLayerProps {
  plants: TaggedPlantPointer[];
  currentPlant: TaggedPlantPointer | undefined;
  dragging: boolean;
  editing: boolean;
  visible: boolean;
  temporaryShowSpread: boolean;
  crops: TaggedCrop[];
  dispatch: Function;
}

export interface CropSpreadDict {
  [key: string]: number | undefined;
}
