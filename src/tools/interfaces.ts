import { AxiosErrorResponse } from "../util";

/** Main */
export interface ToolsState {
  editorMode: boolean;
  tool_bays: ToolBay[];
  tool_slots: ToolSlot[];
  tools: {
    isEditing?: boolean;
    all: Tool[];
    dirty?: boolean;
  };
}

/** Related */
export interface ListAndFormProps {
  dispatch: Function;
  all: ToolsState;
}

export interface ToolBay {
  id: number;
  name: string;
  isEditing?: boolean;
  dirty?: boolean;
  created_at?: string | undefined;
}

export interface ToolBayFormState {
  tool_slots?: ToolSlot[];
  tool_bays?: ToolBay[];
  new_slot_x?: string;
  new_slot_y?: string;
  new_slot_z?: string;
  new_slot_tool_id?: null | number;
}

export interface ToolFormState {
  tools: Tool[];
  newToolName: string;
}

export interface ToolSlot {
  id?: number;
  tool_bay_id?: number;
  tool_id?: null | number;
  created_at?: string;
  x?: number;
  y?: number;
  z?: number;
  dirty?: boolean;
}

export interface UpdateToolSlotPayl {
  value: number;
  name: string;
  id: number;
}

export interface Tool {
  id?: number | undefined;
  name: string;
  dirty?: boolean;
  isNew?: boolean;
  isDeleted?: boolean;
  status?: undefined | "unknown" | "active" | "inactive";
}

/** Actions */
export interface ErrorPayl {
  type: string;
  payload: AxiosErrorResponse;
}
