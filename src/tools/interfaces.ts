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
  getToolSlots(uuid: string): TaggedToolSlot[];
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
  id?: number | undefined;
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
  getToolById(uuid: string): TaggedTool | undefined;
  getToolSlots(uuid: string): TaggedToolSlot[];
}

export interface ToolBayFormProps {
  dispatch: Function;
  toolBays: TaggedToolBay[];
  getToolOptions(): DropDownItem[];
  getChosenToolOption(uuid: string): DropDownItem;
  getToolSlots(uuid: string): TaggedToolSlot[];
}

export interface ToolListProps {
  dispatch: Function;
  getSortedTools(): TaggedTool[];
}

export interface ToolFormProps {
  dispatch: Function;
  tools: TaggedTool[];
  dirtyTools: boolean;
  getSortedTools(): TaggedTool[];
}
