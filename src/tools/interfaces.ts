import { DropDownItem } from "../ui/fb_select";
import { TaggedTool, TaggedToolSlot, TaggedToolBay } from "../resources/tagged_resources";

export interface ToolsState {
  /** Do tools need to be saved? */
  toolsDirty: boolean;
  editingTools: boolean;
  editingBays: boolean;
}

export interface Props {
  toolBays: TaggedToolBay[];
  toolSlots: TaggedToolSlot[];
  tools: TaggedTool[];
  editingTools: boolean;
  editingBays: boolean;
  dirtyTools: boolean;
  getSortedTools(): TaggedTool[];
  getToolOptions(): DropDownItem[];
  getChosenToolOption(toolSlotUuid: string): DropDownItem;
  getToolById(uuid: string): TaggedTool | undefined;
  getToolSlots(toolBayId: number): TaggedToolSlot[];
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
  id: number | undefined;
  name: string;
  dirty?: boolean;
  status?: undefined | "unknown" | "active" | "inactive";
}

export interface ToolBayListProps {
  dispatch: Function;
  toolBays: TaggedToolBay[];
  getToolById(id: number): TaggedTool | undefined;
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
