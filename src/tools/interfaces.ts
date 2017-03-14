import { AxiosErrorResponse } from "../util";

/** Main */
export interface ToolsState {
  editorMode: boolean;
  tool_bays: ToolBay[];
  tool_slots: ToolSlot[];
  tools: {
    isEditing: boolean;
    all: Tool[];
    dirty: boolean;
  };
}

export interface Props {
  toolBays: ToolBay[];
  toolSlots: ToolSlot[];
  tools: Tool[];
  editorMode: boolean;
  isEditingTools: boolean;
  dirtyTools: boolean;
  getSortedTools: Function;
  getToolSlots: Function;
  getToolOptions: Function;
  getChosenToolOption: Function;
  getChosenTool: Function;
  dispatch: Function;
}

export interface ToolBay {
  id: number;
  name: string;
  isEditing?: boolean;
  dirty?: boolean;
  created_at?: string | undefined;
}

export interface ToolFormState {
  newToolName: string;
}

export interface ToolSlot {
  id?: number;
  tool_bay_id?: number;
  tool_id?: number | undefined;
  created_at?: string;
  x: number;
  y: number;
  z: number;
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
