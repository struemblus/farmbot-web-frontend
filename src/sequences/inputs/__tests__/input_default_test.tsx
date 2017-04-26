jest.unmock("../../step_tiles/index");
import * as React from "react";
import { InputDefault } from "../input_default";
import { render } from "enzyme";
import { fakeState, Wrapper } from "../../../test_helpers";
import { TaggedSequence } from "../../../resources/tagged_resources";
import { MoveAbsolute } from "farmbot/dist";
import { updateStep } from "../../step_tiles/index";

describe("<InputDefault/>", () => {
  it("updates the step", () => {
    let dispatcher = jest.fn();
    let state = fakeState();
    let step: MoveAbsolute = {
      "kind": "move_absolute",
      "args": {
        "location": {
          "kind": "coordinate",
          "args": {
            "x": 0,
            "y": 0,
            "z": 0
          }
        },
        "offset": {
          "kind": "coordinate",
          "args": {
            "x": 0,
            "y": 0,
            "z": 0
          }
        },
        "speed": 800
      }
    };

    let tr: TaggedSequence = {
      "kind": "sequences",
      "body": {
        "id": 74,
        "name": "Goto 0, 0, 0",
        "color": "gray",
        "body": [step],
        "args": {
          "version": 4
        },
        "kind": "sequence"
      },
      "uuid": "sequences.74.145"
    };
    let c = render(<Wrapper>
      <InputDefault
        index={0}
        field="speed"
        step={step}
        dispatch={dispatcher}
        sequence={tr} />
    </Wrapper>);
    pending("Out of time for testing today. Will get back to this later. RC 26 APR 17")
    // let input = c.find("input").first();
    // // TODO: Write more comprehensive test.
    // // Test coverage is so low at this point (26 APR 17) I want to get the
    // // basics down and circle back.
    // expect(input.val()).toBe("800");
    // input.val("900");
    // expect(input.val()).toBe("900");
    // let x: jest.Mock<{}> = (updateStep as any).mock;
    // expect(x.mock.calls.length).toEqual(1);
  });
});
