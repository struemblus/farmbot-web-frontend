import { Dictionary } from "farmbot/dist";
import { Sequence } from "../sequences/interfaces";
import { Regimen, RegimenItem } from "../regimens/interfaces";
import { generateReducer } from "../redux/generate_reducer";
import { DeprecatedSync, Log } from "../interfaces";
import { FarmEvent, Plant, Point } from "../farm_designer/interfaces";
import { User } from "../auth/interfaces";
import { Peripheral } from "../controls/peripherals/interfaces";
import { ToolBay, ToolSlot, Tool } from "../tools/interfaces";
import { Image } from "../images/interfaces";
import { indexById, indexRegimenItems, selectAll } from "./util";
import { RestResources } from "./interfaces";
import { TaggedResource } from "./tagged_resources";

/** When you need an empty index because syncing has yet to complete. */
let emptyIndex = () => ({ all: [], byId: {} });

let initialState: RestResources = {
  loaded: false,
  sequences: emptyIndex(),
  regimens: emptyIndex(),
  regimen_items: emptyIndex(),
  farm_events: emptyIndex(),
  plants: emptyIndex(),
  tool_bays: emptyIndex(),
  tool_slots: emptyIndex(),
  tools: emptyIndex(),
  images: emptyIndex(),
  points: emptyIndex(),
  logs: emptyIndex(),
}

/** Responsible for all RESTful resources. */
export let resourceReducer = generateReducer<RestResources>(initialState)
  .add<TaggedResource>("CREATE_RESOURCE_OK", function (state, action) {
    let resource = action.payload;
    mandateID(resource);
    switch (resource.kind) {
      case "tools":
        let id = resource.body.id as number;
        state.tools.all.push(id);
        state.tools.byId[id] = resource.body;
        break;
      default:
        throw new Error("We didn't write a handler for this resource: " +
          action.payload.kind);
    }
    return state;
  })
  .add<DeprecatedSync>("FETCH_SYNC_OK", function (state, action) {
    let p = action.payload;
    p.regimens.map(x => x.regimen_items)
    return _.merge(state, {
      sequences: indexById(p.sequences),
      regimens: indexById(p.regimens),
      farm_events: indexById(p.farm_events),
      plants: indexById(p.plants),
      tool_bays: indexById(p.tool_bays),
      tool_slots: indexById(p.tool_bays),
      tools: indexById(p.tools),
      images: indexById(p.images),
      points: indexById(p.points),
      regimen_items: indexRegimenItems(p.regimens),
      loaded: true
    });
  });

function mandateID(r: TaggedResource) {
  if (!_.isNumber(r.body.id)) {
    throw new Error("TRIED TO ADD AN UNSAVED RESOURCE TO STATE TREE!");
  }
}
