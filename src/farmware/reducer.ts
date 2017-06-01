import { generateReducer } from "../redux/generate_reducer";
import { FarmwareState } from "./interfaces";
import { TaggedResource } from "../resources/tagged_resources";

export let farmwareState: FarmwareState = { currentImage: undefined };

export let famrwareReducer = generateReducer<FarmwareState>(farmwareState)
  .add<string>("SELECT_IMAGE", function (state, action) {
    state.currentImage = action.payload;

    return state;
  })
  .add<TaggedResource>("DESTROY_RESOURCE_OK", function (state, action) {
    let thatUUID = action.payload.uuid;
    let thisUUID = state.currentImage;
    if (thisUUID === thatUUID) { state.currentImage = undefined; }

    return state;
  })
  .add<TaggedResource>("INIT_RESOURCE", function (state, action) {
    if (action.payload.kind === "images") {
      state.currentImage = action.payload.uuid;
    }

    return state;
  })
  .add<void>("RESOURCE_READY", function (s, a) {
    s.currentImage = undefined;
    return s;
  });
