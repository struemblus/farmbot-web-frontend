import { CropLiveSearchResult } from "./interfaces";
import { generateReducer } from "../redux/generate_reducer";
import {
  DesignerState,
  HoveredPlantPayl,
  BotOriginQuadrant,
  isBotOriginQuadrant,
  isValidZoomLevel,
  ZoomLevel
} from "./interfaces";
import { cloneDeep } from "lodash";
import { TaggedResource } from "../resources/tagged_resources";
import { localStorageNumFetch } from "../util";

export const BOT_ORIGIN_QUADRANT = "bot_origin_quadrant";
export const ZOOM_LEVEL = "zoom_level";

let botOriginVal = localStorageNumFetch(BOT_ORIGIN_QUADRANT);
let botOriginQuadrant = isBotOriginQuadrant(botOriginVal) ? botOriginVal : 2;

// let zoomLevelVal = localStorageNumFetch(ZOOM_LEVEL);
// let zoomLevel = isValidZoomLevel(zoomLevelVal) ? zoomLevelVal : 1;
let zoomLevel = parseInt(localStorage[ZOOM_LEVEL]) || 1;

let roundUp = (num: ZoomLevel) => Math.max(Math.ceil(num * 10) / 10);

export let initialState: DesignerState = {
  selectedPlant: undefined,
  hoveredPlant: {
    plantUUID: undefined,
    icon: ""
  },
  botOriginQuadrant,
  zoomLevel,
  cropSearchQuery: "",
  cropSearchResults: []
};

export let designer = generateReducer<DesignerState>(initialState)
  .add<string>("SEARCH_QUERY_CHANGE", (s, { payload }) => {
    let state = cloneDeep(s);
    state.cropSearchQuery = payload;
    return state;
  })
  .add<string | undefined>("SELECT_PLANT", (s, { payload }) => {
    s.selectedPlant = payload;
    return s;
  })
  .add<HoveredPlantPayl>("TOGGLE_HOVERED_PLANT", (s, { payload }) => {
    s.hoveredPlant = payload;
    return s;
  })
  .add<BotOriginQuadrant>("UPDATE_BOT_ORIGIN_QUADRANT", (s, { payload }) => {
    localStorage.setItem(BOT_ORIGIN_QUADRANT, JSON.stringify(payload));
    s.botOriginQuadrant = payload;
    return s;
  })
  .add<ZoomLevel>("UPDATE_MAP_ZOOM_LEVEL", (s, { payload }) => {
    s.zoomLevel = roundUp(s.zoomLevel + payload as ZoomLevel);
    localStorage.setItem(ZOOM_LEVEL, JSON.stringify(payload));
    return s;
  })
  .add<CropLiveSearchResult[]>("OF_SEARCH_RESULTS_OK", (s, { payload }) => {
    let state = cloneDeep(s);
    state.cropSearchResults = payload;
    return state;
  })
  .add<TaggedResource>("DESTROY_RESOURCE_OK", (s, { payload }) => {
    if (payload.uuid === s.selectedPlant) { s.selectedPlant = undefined; }
    return s;
  });
