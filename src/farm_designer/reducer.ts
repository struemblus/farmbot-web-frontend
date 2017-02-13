import { Plant, CropLiveSearchResult } from "./interfaces";
import { Plant as newPlant } from "./plant";
import { generateReducer } from "../redux/generate_reducer";
import {
    DesignerState,
    RegimenWithKindProp
} from "./interfaces";
import { cloneDeep } from "lodash";
import { HardwareState } from "../devices/interfaces";
import { Sync } from "../interfaces";
import { Regimen } from "../regimens/interfaces";
import { Sequence } from "../sequences/interfaces";
import * as moment from "moment";

let DEFAULT_STATE: DesignerState = {
    farmEventToBeAdded: {},
    deprecatedPlants: [],
    x_size: 0,
    y_size: 0,
    cropSearchQuery: "",
    cropSearchResults: [],
    currentSequenceOrRegimen: {}
};

export let designer = generateReducer<DesignerState>(DEFAULT_STATE)
    .add<Sync>("FETCH_SYNC_OK", function (s, a) {
        let state = cloneDeep(s);
        state.deprecatedPlants = a.payload.plants || [];
        return state;
    })
    .add<Plant>("SAVE_PLANT_OK", function (s, a) {
        // Exxxttrraaa runtime safety.
        let plant = newPlant(a.payload);
        s.deprecatedPlants.push(plant);
        return s;
    })
    .add<Plant>("DESTROY_PLANT_OK", function (s, { payload }) {
        let state = cloneDeep(s);
        let a = state.deprecatedPlants;
        a.splice(a.indexOf(payload), 0);
        return state;
    })
    .add<HardwareState>("BOT_CHANGE", function (s, { payload }) {
        let state = cloneDeep(s);
        let [x, y] = [
            payload.mcu_params.movement_axis_nr_steps_x,
            payload.mcu_params.movement_axis_nr_steps_y
        ];
        if (x && y) {
            state.x_size = x;
            state.y_size = y;
        }
        return state;
    })
    .add<string>("SEARCH_QUERY_CHANGE", function (s, { payload }) {
        let state = cloneDeep(s);
        state.cropSearchQuery = payload;
        return state;
    })
    .add<CropLiveSearchResult[]>("OF_SEARCH_RESULTS_OK",
    function (s, { payload }) {
        let state = cloneDeep(s);
        state.cropSearchResults = payload;
        return state;
    })
    .add<Sequence | RegimenWithKindProp>("SELECT_SEQUENCE_OR_REGIMEN",
    function (s, { payload }) {
        /** The regimen doesn't have a `kind` property */
        s.currentSequenceOrRegimen = payload;
        if (s.currentSequenceOrRegimen && !payload.kind) {
            s.currentSequenceOrRegimen.kind = "Regimen";
        }
        return s;
    })
    .add<{ property: string, value: string }>("ADD_FARM_EVENT_START",
    function (s, { payload }) {

        switch (payload.property) {
            case "start_date":
                s.farmEventToBeAdded.start_time = moment(payload.value)
                    .toISOString();
                break;

            case "start_time":
                let merge = moment(`${s.farmEventToBeAdded.start_time}`);
                /** Not sure about this one */
                s.farmEventToBeAdded.start_time = merge.toISOString();
        }

        return s;
    })
    .add<{ property: string, value: string }>("ADD_FARM_EVENT_END",
    function (s, { payload }) {
        switch (payload.property) {
            case "end_date":
                s.farmEventToBeAdded.end_time = moment(payload.value)
                    .toISOString();
                break;

            case "end_time":
                let merge = moment(`${s.farmEventToBeAdded.end_time}`);
                /** Not sure about this one */
                s.farmEventToBeAdded.end_time = merge.toISOString();
        }

        return s;
    })
    .add<{ property: string, value: number }>("ADD_FARM_EVENT_REPEAT",
    function (s, { payload }) {
        let { value } = payload;
        s.farmEventToBeAdded.repeat = value;
        return s;
    })
    .add<{ value: string }>("ADD_FARM_EVENT_TIME_UNIT",
    function (s, { payload }) {
        let { value } = payload;
        s.farmEventToBeAdded.time_unit = value;
        return s;
    });
