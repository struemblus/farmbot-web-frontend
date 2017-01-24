import { generateReducer } from "../redux/generate_reducer";
import { Sync } from "../interfaces";
import { Log } from "../interfaces";
import { Plant } from "../farm_designer/interfaces";

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
    logs: [],
    images: []
};

export let syncReducer = generateReducer<Sync>(initialState)
    .add<Log>("BOT_LOG", function (state, { payload }) {
        state.logs.unshift(payload);
        state.logs = _.take(_.uniq(state.logs, JSON.stringify), 50);
        return state;
    })
    .add<Sync>("FETCH_SYNC_OK", function (s, a) {
        s = a.payload;
        return s;
    })
    .add<{ x: number, y: number, id: number }>("UPDATE_PLANT", function (s, a) {
        let thisOne = _.find<Plant | undefined>(s.plants, function (r) {
            return r ? (r.id === a.payload.id) : false;
        });
        if (thisOne) {
            thisOne.dirty = true;
            thisOne.x += a.payload.x;
            thisOne.y += a.payload.y;
        }
        return s;
    });
