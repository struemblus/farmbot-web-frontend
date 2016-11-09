import * as axios from "axios";
import { t } from "i18next";
import { Thunk } from "../redux/interfaces";
import { success, error } from "../logger";
import { User } from "../auth/interfaces";
import { API } from "../api";
import { ReduxAction } from "../redux/interfaces";
import { UserAccountUpdate } from "./interfaces";

function updateUserSuccess(payload: User): ReduxAction<User> {
    return {
        type: "UPDATE_USER_SUCCESS",
        payload
    };
}

export function updateUser(user: UserAccountUpdate): Thunk {
    return (dispatch, getState) => {
        axios.patch<User>(API.current.usersPath, user)
            .then((resp) => {
                success(t("User successfully updated."));
                dispatch(updateUserSuccess(resp.data));
            }, (e: Error) => {
                error(t(`User could not be updated: ${e}`));
            });
    };
}
