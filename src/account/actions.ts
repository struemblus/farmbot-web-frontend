import * as axios from "axios";
import { Everything } from "../interfaces";
import * as i18next from "i18next";

interface UpdateEmail {
    type: string;
    payload: {};
}

export function updateEmail(email: string): UpdateEmail {
    return {
        type: "UPDATE_EMAIL",
        payload: email
    };
}

interface UpdateName {
    type: string;
    payload: {};
}

export function updateName(name: string): UpdateName {
    return {
        type: "UPDATE_NAME",
        payload: name
    };
}
