import * as Axios from "axios";
import { Thunk } from "../redux/interfaces";
import { Point } from "../farm_designer/interfaces";
import { API } from "../api";

const QUERY = { meta: { created_by: "plant-detection" } };
const URL = API.current.pointSearchPath;
export function resetWeedDetection(): Thunk {
    return async function (dispatch, getState) {
        try {
            let { data } = await Axios.post<Point[]>(URL, QUERY);
            let ids = data.map(x => x.id);
            if (ids.length) {
                await Axios.delete(API.current.pointsPath + ids.join(","));
                dispatch({
                    type: "DELETE_POINT_OK",
                    payload: ids
                });
            }
        } catch (e) {
            throw e;
        }
    };
};
