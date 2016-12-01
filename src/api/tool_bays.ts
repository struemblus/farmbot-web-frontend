import { ToolBay } from "../tools/interfaces";
import { API } from "./api";
import * as Axios from "axios";

export namespace ToolBays {
    /** Data that you are allowed to send the API when updating a tool bay */
    export interface ToolBayUpdateParams {
        name?: string;
        id: number;
    };

    /** Retrieve one tool bay (by ID) from the API. */
    export function find(id: number) {
        return Axios.get<ToolBay>(API.current.toolBaysPath + id);
    }

    /** Retrieve an array of all tool bays for the current user. */
    export function all() {
        return Axios.get<ToolBay>(API.current.toolBaysPath);
    }

    /** Update a tool bay's attributes. */
    export function update(input: ToolBayUpdateParams) {
        return Axios.put<ToolBay>(API.current.toolBaysPath + input.id, input);
    }
};
