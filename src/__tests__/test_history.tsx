import { history, push } from "../history";

describe("", () => {
    it("", () => {
        const URL = "/wow.html";
        let oldFn = history.push;
        history.push = jest.fn();
        push(URL);
        expect(history.push).toHaveBeenCalledWith(URL);
        history.push = oldFn;
    });
});
