import { generateReducer } from "../redux/generate_reducer";
import { Sync } from "../interfaces";
import { Log } from "../interfaces";
import {
    Plant,
    MovePlantProps,
    FarmEvent
} from "../farm_designer/interfaces";

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
    points: [],
    logs: [],
    farm_events: [],
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
    .add<MovePlantProps>("MOVE_PLANT", function (s, a) {
        let thisOne = findPlantById(s.plants, a.payload.plantId);
        thisOne.x += a.payload.deltaX;
        thisOne.y += a.payload.deltaY;
        thisOne.dirty = true;
        return s;
    })
    .add<Partial<Plant>>("UPDATE_PLANT_OK", function (s, a) {
        let thisOne = findPlantById(s.plants, a.payload.id);
        _.merge(thisOne, a.payload);
        thisOne.dirty = false;
        return s;
    })
    .add<number[]>("DELETE_POINT_OK", function (s, a) {
        let deletedPoints = a.payload;
        s.points = s.points.filter(function (point) {
            return !deletedPoints.includes(point.id);
        });
        return s;
    })
    .add<{ id: number }>("DELETE_FARM_EVENT_OK", function (s, { payload }) {
        let index = _.findIndex(s.farm_events, { id: payload.id });
        s.farm_events.splice(index, 1);
        return s;
    })
    .add<FarmEvent>("SAVE_FARM_EVENT_OK", function (s, { payload }) {
        s.farm_events.push(payload);
        return s;
    });

export function findPlantById(plants: Plant[], id: number | undefined): Plant {
    let result = _.find<Plant | undefined>(plants, function (r) {
        return r ? (r.id === id) : false;
    });

    if (result && id) {
        return result;
    } else {
        // This method doesn't work for unsaved records.
        throw new Error("Failed to find plant with id of ${id}.");
    }
};
