import { Everything } from "../interfaces";

export interface ReduxAction<T> {
    readonly type: string;
    readonly payload: T;
};

/** The "getState()" function, typically passed in by Redux Thunk Middleware. */
export type GetState = () => Everything;

/** A Redux Thunk function. */
export interface Thunk {
    (dispatch: Function, getState: GetState): any;
};
