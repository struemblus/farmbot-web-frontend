import * as _ from "lodash";
import { User, AuthState } from "./interfaces";
import { generateReducer } from "../redux/generate_reducer";
import { Session } from "../session";

export let authReducer = generateReducer<AuthState | undefined>(undefined)
  .add<User>("UPDATE_USER_SUCCESS", function (s, a) {
    if (s) { s.user = a.payload; }
    return s;
  })
  .add<AuthState>("LOGOUT", function (s, a) {
    return s;
  })
  .add<AuthState>("LOGIN_OK", function (s, a) {
    return a.payload;
  })
  .add<void>("LOGIN_ERR", function (s, a) {
    return s;
  });
