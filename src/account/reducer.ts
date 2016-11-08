import {
    updateName,
    updateEmail
} from "./actions";
import { generateReducer } from "../redux/generate_reducer";

interface AccountReducerState {
    email: string;
    name: string;
    oldPassword: string;
    newPassword: string;
}

const initialState: AccountReducerState = {
    email: "",
    name: "",
    oldPassword: "",
    newPassword: "",
};

export let accountReducer = generateReducer<AccountReducerState>(initialState)
    .add<{ index: number, comment: string }>("UPDATE_EMAIL", function (s, a) {
        // let email = a.payload;
        // return s;
    });

