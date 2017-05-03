import { draggableReducer } from "../reducer";
import { DragableState } from "../interfaces";

describe("draggableReducer", () => {
  function emptyState(): DragableState {
    return { dataTransfer: {} };
  }

  it("puts a step", () => {
    let payload = { uuid: "FOO" };
    let action = { type: "PUT_DATA_XFER", payload };
    let nextState = draggableReducer(emptyState(), action);
    let dt = nextState.dataTransfer;
    expect(Object.keys(dt)).toContain(payload.uuid);
    let entry = dt[payload.uuid];
    expect(entry && entry.uuid).toEqual(payload.uuid);
  });

  it("drops a step");
})
