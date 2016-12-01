import { Tool, ToolBay, ToolSlot } from "../tools/interfaces";
import { API } from "./api";
import * as Axios from "axios";

export namespace ToolSlots {
    /** Data that you are allowed to send the API when creating
     *  a tool slot resource */
    export interface ToolSlotCreateParams {
        name: string;
        x: number;
        y: number;
        z: number;
        tool_bay_id: number;
    };

    /** Data that you are allowed to send the API when updating a tool slot */
    export interface ToolSlotUpdateParams {
        name?: string;
        x?: number;
        y?: number;
        z?: number;
        tool_bay_id?: number;
        id: number;
    };

    /** Create a new tool slot resource on the API. */
    export function create(input: ToolSlotCreateParams) {
        return Axios.post<ToolSlot>(API.current.toolSlotsPath, input);
    }

    /** Retrieve one tool slot (by ID) from the API. */
    export function find(id: number) {
        return Axios.get<ToolSlot>(API.current.toolSlotsPath + id);
    }

    /** Retrieve an array of all tool slots for the current user. */
    export function all() {
        return Axios.get<ToolSlot>(API.current.toolSlotsPath);
    }

    /** Update a tool slot's attributes. */
    export function update(input: ToolSlotUpdateParams) {
        return Axios.put<ToolSlot>(API.current.toolSlotsPath + input.id, input);
    }

    /** Delete a tool slot from the API. */
    export function destroy(id: number) {
        return Axios.delete<ToolSlot>(API.current.toolSlotsPath + id);
    }
};
