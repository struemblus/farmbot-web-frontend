import * as axios from "axios";
import { t } from "i18next";
import { Thunk } from "../redux/interfaces";
import { success, error } from "../logger";
import { User } from "./interfaces";
import { API } from "../api";
import { ReduxAction } from "../redux/interfaces";

function updateUserSuccess(payload: User): ReduxAction<User> {
    return {
        type: "UPDATE_USER_SUCCESS",
        payload
    };
}

// function updatePasswordSuccess(payload: User): ReduxAction<User> {
//     return {
//         type: "UPDATE_PASSWORD_SUCCESS",
//         payload
//     };
// }

// pass in password, password_confirmation
export function updateUser(user: User): Thunk {
    return (dispatch, getState) => {

        axios.patch<User>(API.current.usersPath)
            .then(() => {
                success(t("User successfully updated."));
                dispatch(updateUserSuccess("Success"));
            }, (e: Error) => {
                error(t(`User could not be updated: ${e}`));
            });
    };
}

// pass in password, password_confirmation

