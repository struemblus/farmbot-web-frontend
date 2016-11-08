import { UpdateEmailPayl } from "./interfaces";
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
    .add<UpdateEmailPayl>("UPDATE_EMAIL", function(s, a) {
        // let email = a.payload;
        let myIndex = a.payload.index;
        return s;
    });

