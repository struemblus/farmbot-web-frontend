import { DropDownItem } from "../ui/fb_select";

export interface ToolsState {
  /** Do tools need to be saved? */
  toolsDirty: boolean;
  editingTools: boolean;
  editingBays: boolean;
}

export interface Props {
  toolBays: ToolBay[];
  toolSlots: ToolSlot[];
  tools: Tool[];
  editingTools: boolean;
  editingBays: boolean;
  dirtyTools: boolean;
  getSortedTools(): Tool[];
  getToolSlots(toolBayId: number): ToolSlot[];
  getToolOptions(): DropDownItem[];
  getChosenToolOption(toolSlotId: number): DropDownItem;
  getChosenTool(toolSlotId: number): Tool;
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
  id: number;
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
  status?: undefined | "unknown" | "active" | "inactive";
}

export interface ToolBayListProps {
  dispatch: Function;
  toolBays: ToolBay[];
  getChosenTool(toolSlotId: number): Tool;
  getToolSlots(toolBayId: number): ToolSlot[];
}

export interface ToolBayFormProps {
  dispatch: Function;
  toolBays: ToolBay[];
  getToolOptions(): DropDownItem[];
  getChosenToolOption(toolSlotId: number): DropDownItem;
  getToolSlots(toolBayId: number): ToolSlot[];
}

export interface ToolListProps {
  dispatch: Function;
  getSortedTools(): Tool[];
}

export interface ToolFormProps {
  dispatch: Function;
  tools: Tool[];
  dirtyTools: boolean;
  getSortedTools(): Tool[];
}
