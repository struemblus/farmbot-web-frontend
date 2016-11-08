import * as axios from "axios";
import { Everything } from "../interfaces";
import { t } from "i18next";
import { Thunk } from "../redux/interfaces";
import { success, error } from "../logger";
import { User, UpdateUserSuccess, UpdateUserErr } from "./interfaces";

function updateUserSuccess(message: string): UpdateUserSuccess {
    return {
        type: "UPDATE_USER_SUCCESS",
        payload: message
    };
}

function updateUserErr(message: string): UpdateUserErr {
    return {
        type: "UPDATE_USER_ERROR",
        payload: message
    };
}

export function updateUser(user: User): Thunk {
    return (dispatch: Function, getState: Function) => {
        let url = getState().auth.iss;

        axios.patch<User>(`${url}/api/users`)
            .then(() => {
                success(t("User successfully updated."));
                dispatch(updateUserSuccess("Success"));
            }, (e: Error) => {
                error(t("User could not be updated."));
                dispatch(updateUserErr(`Error: ${e}`));
            });
    };
}
