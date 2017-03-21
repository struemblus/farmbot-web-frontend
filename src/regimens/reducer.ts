import { RegimensState, Regimen, RegimenItem } from "./interfaces";
import { generateReducer } from "../redux/generate_reducer";
import { ReduxAction } from "../redux/interfaces";

export function emptyRegimen(): Regimen {
  return {
    name: "Untitled Regimen",
    color: "gray",
    regimen_items: [],
    dirty: true
  };
}

const initialState: RegimensState = { current: "FIX THIS" };

export let regimensReducer = generateReducer<RegimensState>(initialState)
  // .add<{ regimen: Regimen, update: Regimen }>("EDIT_REGIMEN",
  // function (state, action) {
  //   let update = {
  //     ...action.payload.regimen,
  //     ...action.payload.update,
  //     dirty: true
  //   };
  //   state.current = update;
  //   return state;
  // })
  // .add<void>("NEW_REGIMEN", function (state, action) {
  //   state.current = emptyRegimen();
  //   return state;
  // })
  // .add<Regimen>("SELECT_REGIMEN", function (state, action) {
  //   delete state.current.dirty; // ???
  //   state.current = action.payload;
  //   return state;
  // })
  // .add<Regimen>("COPY_REGIMEN", function (state, action) {
  //   // DONT COMMIT THIS CODE!!!
  //   if (_.isNumber(123)) {
  //     throw new Error("Fix this!");
  //   }
  //   // let regi = action.payload;
  //   // // Unset the ID to avoid accidentally overwriting parent.
  //   // regi.id = undefined;
  //   // regi.dirty = true;
  //   // // "My regimen (copy 1)" => "My regimen"
  //   // let baseName = regi.name.replace(/ \(copy \d*\)/, "");
  //   // // TODO: This function has string typing, regexes and inband signalling.
  //   // // I like to avoid all of those. Possible refactor target?
  //   // let copies = _.select(state.all, function (item) {
  //   //   return (item.name.indexOf(baseName) !== -1);
  //   // }).length;
  //   // // Give it a name with the (copy X) stripped out
  //   // regi.name = baseName;
  //   // // Add the (copy X) back
  //   // regi.name += ` (copy ${copies})`;
  //   // state.current = state.all.length;
  //   // state.all.push(regi);
  //   return state;
  // })
  // .add<{ index: number, regimenItems: RegimenItem[] }>
  // ("COMMIT_BULK_EDITOR", function (state, action) {
  //   let { regimenItems } = action.payload;
  //   let ok = _.cloneDeep(regimenItems);
  //   let hmm = state.current.regimen_items;
  //   state.current.dirty = true;
  //   state.current.regimen_items = hmm.concat(ok);
  //   return state;
  // });
