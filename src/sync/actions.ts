import { Thunk } from "../redux/interfaces";
import { Sync } from "../interfaces";
import { error } from "../ui";
import { API } from "../api";
import { t } from "i18next";
import * as axios from "axios";
import { Sequence } from "../sequences/interfaces";
import { Tool } from "../tools/interfaces";
import { IPromise } from "promise";

function getTools() {
  return axios.get<Tool[]>(API.current.toolsPath)
    .then((resp): Tool[] => {
      return resp.data;
      // dispatch(fetchSyncDataOk(data));
    }, (e: Error) => {
      error(t("Could not download sync data"));
      // dispatch(fetchSyncDataNo(e));
    });
};

function getSequences() {
  return axios.get<Sequence[]>(API.current.sequencesPath)
    .then((resp): Sequence[] => {
      return resp.data;
      // dispatch(fetchSyncDataOk(data));
    }, (e: Error) => {
      error(t("Could not download sync data"));
      // dispatch(fetchSyncDataNo(e));
    });
};

export function fetchSyncData() {
  Promise.all([getTools(), getSequences()]).then((data) => {
    let [tools, sequences] = data;
  });
}


// _____________________________________ sync only

// export function fetchSyncData(): Thunk {
//   return (dispatch: Function, getState: Function) => {
//     axios.get<Sync>(API.current.syncPath)
//       .then(({ data }) => {
//         dispatch(fetchSyncDataOk(data));
//       }, (e: Error) => {
//         error(t("Could not download sync data"));
//         dispatch(fetchSyncDataNo(e));
//       });
//   };
// };

// function fetchSyncDataOk(sync: Sync) {
//   return {
//     type: "FETCH_SYNC_OK",
//     payload: sync
//   };
// }

// function fetchSyncDataNo(err: Error) {
//   return {
//     type: "FETCH_SYNC_NO",
//     payload: {}
//   };
// }
