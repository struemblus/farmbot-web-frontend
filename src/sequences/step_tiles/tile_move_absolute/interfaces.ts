import { ResourceIndex } from "../../../resources/interfaces";
import { MoveAbsolute, PointType } from "farmbot/dist";
export const TOOL: "Tool" = "Tool";

export type CALLBACK = (out: LocationData) => void;

export interface TileMoveAbsProps {
  resources: ResourceIndex;
  selectedItem: LocationData;
  onChange: CALLBACK;
}

export interface InputBoxProps {
  onCommit(e: React.SyntheticEvent<HTMLInputElement>): void;
  children?: JSX.Element;
  disabled?: boolean;
  name: string;
  value: string;
}

/** Union of all types found in a move_abs "args" attribute. */
export type LocationData = MoveAbsolute["args"]["location"];

/** Union of all possible `headingId` values in the move abs dropdown. */
export type KnownGroupTag = PointType | typeof TOOL;

