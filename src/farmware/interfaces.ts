import { BotState } from "../devices/interfaces";
import { TaggedImage } from "../resources/tagged_resources";

export interface FWState {
  selectedFarmware: string | undefined;
  packageUrl: string | undefined;
}

export interface FWProps {
  bot: BotState;
}

export interface Props {
  bot: BotState;
  dispatch: Function;
  images: TaggedImage[];
  currentImage: TaggedImage | undefined;
}

export interface PhotosProps {
  dispatch: Function;
  images: TaggedImage[];
  currentImage: TaggedImage | undefined;
}

export interface CameraCalibrationState {
  settingsMenuOpen: boolean;
}

export interface CameraCalibrationProps {
  images: TaggedImage[];
  currentImage: TaggedImage | undefined;
}

export interface FarmwareState {
  currentImage: string | undefined;
}
