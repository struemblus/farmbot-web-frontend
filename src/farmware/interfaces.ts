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
  currentImage: string | undefined;
}

export interface PhotosProps {
  images: TaggedImage[];
  currentImage: string | undefined;
}

export interface CameraCalibrationState {
  settingsMenuOpen: boolean;
}

export interface CameraCalibrationProps {
  images: TaggedImage[];
}

export interface FarmwareState {
  currentImage: string | undefined;
}
