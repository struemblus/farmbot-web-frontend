import { scale, round } from "../util";

describe("Utils", () => {
  it("scales a number", () => {
    expect(Math.round(scale(100))).toEqual(490);
  });

  it("rounds a number", () => {
    expect(round(44)).toEqual(40);
    expect(round(98)).toEqual(100);
  });

  it("translates garden coords to screen coords");
});
