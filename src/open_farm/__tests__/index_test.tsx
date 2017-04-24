jest.mock("axios", function () {
  return {
    get: function () {
      console.log("HELLO???");
      return Promise.resolve({
        data: {
          id: 0,
          data: {
            attributes: {
              svg_icon: "nothing to see here...",
              slug: "lettuce"
            }
          }
        }
      });
    }
  }
})
import { cachedIcon, DATA_URI } from "../index";

describe("cachedIcon()", () => {
  it("does an HTTP request if the icon can't be found locally", (done) => {
    cachedIcon("lettuce")
      .then(function (item) {
        expect(item).toContain("openfarm.cc");
        expect(item).toContain(DATA_URI);
        expect(item).toContain("lettuce");
        done();
      })
      .catch(() => { fail() });
  });
});
