import * as React from "react";
import { shallow } from "enzyme";
import { ChangePassword } from "../change_password";
import { ChangePwPropTypes } from "../../interfaces";

test("<ChangePassword/>", function() {
    it("renders", function() {
        let props: ChangePwPropTypes = {
            password: "wow",
            new_password: "wow",
            new_password_confirmation: "wow",
            set: function() { },
            save: function() { }
        };
        let dom = shallow(<ChangePassword {...props} />);
        expect(dom.text()).toContain("password");
    });
});
