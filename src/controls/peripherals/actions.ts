import { GetState } from "../../redux/interfaces";
import { findByUuid } from "../../resources/reducer";
import { API } from "../../api/api";
import * as Axios from "axios";
import { defensiveClone } from "../../util";
import { isTaggedResource } from "../../resources/tagged_resources";
import { createOK, createNO } from "../../resources/actions";
import { UnsafeError } from "../../interfaces";
import { Peripheral } from "./interfaces";

/**
 * TODO: The only reason we need this is because our api 
 * is handling the `peripherals` endpoint differently than
 * the other ones. As soon as that is fixed, we can delete
 * this file and simply call `initSave` for the (+) button.
 */
export function uniquePeripheralsCreate(data: any) {
  return function (dispatch: Function, getState: GetState) {
    let uniqueThing = { peripherals: [data] }
    return Axios
      .post<Peripheral>(API.current.peripheralsPath, uniqueThing)
      .then(function (resp) {
        dispatch({ type: "PUSH_PERIPHERAL", payload: resp.data });
      })
      .catch(function (err: UnsafeError) {
        dispatch(createNO(err));
      });
  }
}