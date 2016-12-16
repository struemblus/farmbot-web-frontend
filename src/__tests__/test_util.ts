import * as util from "../util";

describe("util.defensiveClone", () => {
    it("deep clones any serializable object", () => {
        let origin = { a: "b", c: 2, d: [{ e: { f: "g" } }] };
        let child = util.defensiveClone(origin);
        origin.a = "--";
        origin.c = 0;
        origin.d[0].e.f = "--";
        expect(child).not.toBe(origin);
        expect(child.a).toEqual("b");
        expect(child.c).toEqual(2);
        expect(child.d[0].e.f).toEqual("g");
    });
});

describe("util.getParam", () => {
    it("gets params", () => {
        Object.defineProperty(window.location, "search", {
            writable: true,
            value: "?foo=bar&baz=wow"
        });
        expect(util.getParam("foo")).toEqual("bar");
        expect(util.getParam("baz")).toEqual("wow");
        expect(util.getParam("blah")).toEqual("");
    });
});

describe("util.prettyPrintApiErrors", () => {
    it("handles properly formatted API error messages", () => {
        let result = util.prettyPrintApiErrors({
            response: {
                data: {
                    email: "can't be blank"
                }
            }
        });
        expect(result).toEqual("Email can't be blank.");
    });
});

describe("util.beep()", () => {
    it("¯\_(ツ)_/¯", () => {
        util.beep();
    });
});
// describe("util.x", () => {
//     it("y", () => {

//     });
// });
