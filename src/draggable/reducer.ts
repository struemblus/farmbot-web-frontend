import { generateReducer } from "../redux/generate_reducer";
import { DraggableState, DataXfer } from "./interfaces";

const INITIAL_STATE: DraggableState = {
  dataTransfer: {}
};

export let draggableReducer = generateReducer<DraggableState>(INITIAL_STATE)
  .add<DataXfer>("PUT_DATA_XFER", function (s, a) {
    s.dataTransfer[a.payload.uuid] = a.payload;
    return s;
  })
  .add<string>("DROP_DATA_XFER", function (s, a) {
    delete s.dataTransfer[a.payload];
    return s;
  });
