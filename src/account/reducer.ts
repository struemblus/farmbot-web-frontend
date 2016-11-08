import { UpdateUserPayl } from "./interfaces";
import { generateReducer } from "../redux/generate_reducer";

interface AccountReducerState {
    name: string;
    email: string;
    oldPwd: string;
    newPwd: string;
    checkNewPwd: string;
}

const initialState: AccountReducerState = {
    name: "",
    email: "",
    oldPwd: "",
    newPwd: "",
    checkNewPwd: ""
};

export let accountReducer = generateReducer<AccountReducerState>(initialState)
    .add<UpdateUserPayl>("UPDATE_USER_SUCCESS", function (s, a) {
        //
        //
        return s;
    });

