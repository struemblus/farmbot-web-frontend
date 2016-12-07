import { generateReducer } from "../redux/generate_reducer";
import { Sync } from "../interfaces";

const initialState: Sync = {
    api_version: "",
    compat_num: 0,
    device: {
        id: 0,
        name: "",
        webcam_url: "",
        dirty: false
    },
    users: [],
    sequences: [],
    regimens: [],
    peripherals: [],
    regimen_items: [],
    tool_bays: [],
    tool_slots: [],
    tools: [],
    plants: [],
    logs: []
};

export let syncReducer = generateReducer<Sync>(initialState)
    .add<Sync>("FETCH_SYNC_OK", function (s, a) {
        s = a.payload;
        return s;
    });
