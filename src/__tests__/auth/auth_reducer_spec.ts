import { authReducer } from "../../auth/reducer";
import { fakeState } from "../helpers";
import { ReduxAction } from "../../redux/interfaces";
import { AuthState } from "../../auth/interfaces";
import { } from "jasmine";

describe("Auth reducer", () => {
    it("Handles login", () => {
        let state = fakeState().auth;
        let action: ReduxAction<AuthState> = {
            type: "LOGIN_OK",
            payload: {
                token: "xyz",
                sub: "email@email.com",
                jti: "asdfadfgr456456",
                iss: "http://apiserver.com",
                mqtt: "mqttbroker.com",
                bot: "123345uuid-asdf",
                os_update_server: "https://api.github.com/repos/farmbot/farmbot_os/releases/latest",
                fw_update_server: "https://api.github.com/repos/FarmBot/farmbot-arduino-firmware/releases/latest",
                iat: 0,
                exp: 0
            }
        };
        let nextState = authReducer(state, action);
        expect(nextState).toBeDefined();
        expect(nextState.token).toEqual(action.payload.token)
        expect(nextState.authenticated).toBeTruthy()
    });

    it("Handles login Error", () => {
        let state = fakeState().auth
        let action: ReduxAction<AuthState> = {
            type: "LOGIN_ERR",
            payload: {
                token: "xyz",
                sub: "email@email.com",
                jti: "asdfadfgr456456",
                iss: "http://apiserver.com",
                mqtt: "mqttbroker.com",
                bot: "123345uuid-asdf",
                os_update_server: "https://api.github.com/repos/farmbot/farmbot_os/releases/latest",
                fw_update_server: "https://api.github.com/repos/FarmBot/farmbot-arduino-firmware/releases/latest",
                iat: 0,
                exp: 0
            }
        };
        let nextState = authReducer(state, action);
        expect(nextState.authenticated).toEqual(false)
    });
});
