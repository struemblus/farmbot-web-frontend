import { TaggedPeripheral } from "../../resources/tagged_resources";

export interface PeripheralState {
  isEditing: boolean;
}

export interface Peripheral {
  id?: number;
  dirty?: boolean;
  mode?: number;
  pin: number;
  label: string;
}

export interface PeripheralFormProps {
  dispatch: Function;
  peripherals: TaggedPeripheral[];
}

export interface PeripheralListProps {
  dispatch: Function;
  peripherals: TaggedPeripheral[];
}