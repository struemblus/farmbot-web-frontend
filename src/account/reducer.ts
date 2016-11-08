import { UpdateUserPayl } from "./interfaces";
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
    .add<UpdateUserPayl>("UPDATE_USER_SUCCESS", function (s, a) {
        //
        //
        return s;
    })
    .add<UpdateUserPayl>("UPDATE_USER_ERR", function (s, a) {
        //
        //
        return s;
    });

