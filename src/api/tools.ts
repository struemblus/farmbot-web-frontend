import { Tool } from "../tools/interfaces";
import { API } from "./api";
import * as Axios from "axios";

export namespace Tools {
    /** Data that you are allowed to send the API when creating
     *  a tool resource */
    export interface ToolCreateParams {
        name: string;
        tool_slot_id: number;
    };

    /** Data that you are allowed to send the API when updating a tool */
    export interface ToolUpdateParams {
        name?: string;
        tool_slot_id?: number;
        id: number;
    };

    /** Create a new tool resource on the API. */
    export function create(input: ToolCreateParams) {
        return Axios.post<Tool>(API.current.toolsPath, input);
    }

    /** Retrieve one tool (by ID) from the API. */
    export function find(id: number) {
        return Axios.get<Tool>(API.current.toolsPath + id);
    }

    /** Retrieve an array of all tools for the current user. */
    export function all() {
        return Axios.get<Tool>(API.current.toolsPath);
    }

    /** Update a tool's attributes. */
    export function update(input: ToolUpdateParams) {
        return Axios.put<Tool>(API.current.toolsPath + input.id, input);
    }

    /** Delete a tool from the API. */
    export function destroy(id: number) {
        return Axios.delete<Tool>(API.current.toolsPath + id);
    }
};
