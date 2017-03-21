import { Regimen, RegimenItem, RegimenProps } from "../interfaces";
import { AuthState } from "../../auth/interfaces";
import { BotState } from "../../devices/interfaces";
import { TaggedRegimen } from "../../resources/tagged_resources";

export interface ActiveEditorProps {
  regimen: TaggedRegimen;
  dispatch: Function;
}

export interface RegimenItemListProps {
  items: RegimenItem[];
  dispatch: Function;
}

export interface RegimenItemStepProps {
  item: RegimenItem;
  dispatch: Function;
}

export interface RegimenItemDayGroupProps {
  day: string;
  items: RegimenItem[];
  dispatch: Function;
}

export interface RegimenEditorWidgetProps {
  current: TaggedRegimen | undefined;
  dispatch: Function;
  auth: AuthState | undefined;
  bot: BotState;
}

export interface CopyButtnProps {
  dispatch: Function;
  regimen?: TaggedRegimen;
}

export interface DeleteButtonProps extends RegimenProps {
  baseUrl: string;
};
