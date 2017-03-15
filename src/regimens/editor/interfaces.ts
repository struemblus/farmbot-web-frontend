import { Regimen, RegimenItem, RegimenProps } from "../interfaces";

export interface ActiveEditorProps {
  regimen: Regimen;
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

export interface SaveButtonProps extends RegimenProps {
  url: string;
};
