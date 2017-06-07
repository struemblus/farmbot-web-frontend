import { CropLiveSearchResult } from "./interfaces";
import { generateReducer } from "../redux/generate_reducer";
import {
  DesignerState,
  HoveredPlantPayl,
  BotOriginQuadrant
} from "./interfaces";
import { cloneDeep } from "lodash";
import { TaggedResource } from "../resources/tagged_resources";

export let initialState: DesignerState = {
  selectedPlant: undefined,
  hoveredPlant: {
    plant: undefined,
    icon: ""
  },
  botOriginQuadrant: 2,
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
    s.botOriginQuadrant = payload;
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
