import { SequenceReducerState } from "./interfaces";
import { generateReducer } from "../redux/generate_reducer";
import { TaggedResource } from "../resources/tagged_resources";

export const initialState: SequenceReducerState = {
  current: undefined
};

export let sequenceReducer = generateReducer<SequenceReducerState>(initialState)
  .add<TaggedResource>("DESTROY_RESOURCE_OK", function (state, action) {
    switch (action.payload.uuid) {
      case state.current:
        state.current = undefined;
        break;
    }
    return state;
  })
  .add<TaggedResource>("INIT_RESOURCE", function (state, action) {
    if (action.payload.kind === "sequences") {
      state.current = action.payload.uuid;
    }
    return state;
  })
  .add<string>("SELECT_SEQUENCE", function (s, a) {
    s.current = a.payload;
    return s;
  })
  .add<void>("RESOURCE_READY", function (s, a) {
    s.current = undefined;
    return s;
  });
