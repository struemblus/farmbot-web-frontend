import { CropLiveSearchResult } from "./interfaces";
import { generateReducer } from "../redux/generate_reducer";
import { DesignerState } from "./interfaces";
import { cloneDeep } from "lodash";
import { TaggedResource } from "../resources/tagged_resources";

export let initialState: DesignerState = {
  selectedPlant: undefined,
  cropSearchQuery: "",
  cropSearchResults: []
};

export let designer = generateReducer<DesignerState>(initialState)
  .add<string>("SEARCH_QUERY_CHANGE", function (s, { payload }) {
    let state = cloneDeep(s);
    state.cropSearchQuery = payload;
    return state;
  })
  .add<string | undefined>("SELECT_PLANT", (s, a) => {
    s.selectedPlant = a.payload;
    return s;
  })
  .add<CropLiveSearchResult[]>("OF_SEARCH_RESULTS_OK",
  function (s, { payload }) {
    let state = cloneDeep(s);
    state.cropSearchResults = payload;
    return state;
  })
  .add<TaggedResource>("DESTROY_RESOURCE_OK", function (s, a) {
    if (a.payload.uuid === s.selectedPlant) { s.selectedPlant = undefined; }
    return s;
  });
