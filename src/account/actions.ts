import * as axios from "axios";
import { Everything } from "../interfaces";
import * as i18next from "i18next";
import { ReduxAction } from "../redux/interfaces";
import { UpdateEmailPayl } from "./interfaces";

export function updateEmail(email: string): ReduxAction<UpdateEmailPayl> {
    return {
        type: "UPDATE_EMAIL",
        payload: { index: -1, comment: email }
    };
}

interface UpdateName {
    name: string;
}

export function updateName(payload: UpdateName): ReduxAction<UpdateName> {
    return { type: "UPDATE_NAME", payload };
}
