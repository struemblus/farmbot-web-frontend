import { generateReducer } from "../redux/generate_reducer";

let initialState = {};

export let toolsReducer = generateReducer<{}>(initialState);
