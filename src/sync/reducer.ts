import { generateReducer } from "../redux/generate_reducer";
import { Sync } from "../interfaces";

const initialState: Sync = {};

export let syncReducer = generateReducer<Sync>(initialState)
    .add<Sync>("FETCH_SYNC_OK", function (s, a) {
        s = a.payload;
        return s;
    });


