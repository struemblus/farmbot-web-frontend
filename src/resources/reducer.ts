import { generateReducer } from "../redux/generate_reducer";
import { DeprecatedSync } from "../interfaces";
import { RestResources, ResourceIndex } from "./interfaces";
import {
  TaggedResource,
  ResourceName,
  sanityCheck,
  isTaggedResource
} from "./tagged_resources";
import { isUndefined } from "util";
import { descriptiveUUID } from "./util";
import { EditResourceParams } from "../api/crud";
import {
  initialState as sequenceState,
  sequenceReducer as sequences,
} from "../sequences/reducer";
import {
  initialState as regimenState,
  regimensReducer as regimens
} from "../regimens/reducer";
import { combineReducers } from "redux";
import { ReduxAction } from "../redux/interfaces";
import {
  designer as farm_designer,
  initialState as designerState
} from "../farm_designer/reducer";

let consumerReducer = combineReducers({
  regimens,
  sequences,
  farm_designer
});

function emptyState(): RestResources {
  return {
    consumers: {
      sequences: sequenceState,
      regimens: regimenState,
      farm_designer: designerState
    },
    loaded: false,
    index: {
      all: [],
      byKind: {
        device: [],
        farm_events: [],
        images: [],
        logs: [],
        peripherals: [],
        plants: [],
        points: [],
        regimen_items: [],
        regimens: [],
        sequences: [],
        tool_bays: [],
        tool_slots: [],
        tools: [],
        users: []
      },
      byKindAndId: {},
      references: {}
    }
  };
}

let initialState: RestResources = emptyState();
let afterEach = (state: RestResources, a: ReduxAction<any>) => {
  state.consumers = consumerReducer({
    sequences: state.consumers.sequences,
    regimens: state.consumers.regimens,
    farm_designer: state.consumers.farm_designer
  }, a) as any;
  return state;
};

/** Responsible for all RESTful resources. */
export let resourceReducer = generateReducer
  <RestResources>(initialState, afterEach)
  .add<TaggedResource>("CREATE_RESOURCE_OK", function (state, action) {
    let resource = action.payload;
    if (resource
      && resource.body
      && resource.body.id) {
      switch (resource.kind) {
        case "peripherals":
        // console.log("Handle peripherals in resource reducer.");
        // break;
        case "farm_events":
        case "plants":
        case "regimens":
        case "sequences":
        case "tool_slots":
        case "tools":
          state.index.references[resource.uuid] = resource;
          break;
        default:
          whoops("CREATE_RESOURCE_OK", action.payload.kind);
      }
    } else {
      throw new Error("Somehow, a resource was created without an ID?");
    }
    return state;
  })
  .add<TaggedResource>("DESTROY_RESOURCE_OK", function (state, action) {
    let resource = action.payload;
    switch (resource.kind) {
      case "peripherals":
      // console.log("Handle peripherals in resource reducer.");
      // break;
      case "farm_events":
      case "plants":
      case "regimens":
      case "sequences":
      case "tools":
      case "tool_slots":
      case "tool_bays":
        removeFromIndex(state.index, resource);
        break;
      default:
        whoops("DESTROY_RESOURCE_OK", action.payload.kind);
    }
    return state;
  })
  .add<TaggedResource>("UPDATE_RESOURCE_OK", function (s, a) {
    let uuid = a.payload.uuid;
    let tr = _.merge(findByUuid(s.index, uuid), a.payload);
    tr.dirty = false;
    sanityCheck(tr);
    return s;
  })
  .add<EditResourceParams>("EDIT_RESOURCE", function (s, a) {
    let uuid = a.payload.uuid;
    let { update } = a.payload;
    let source = _.merge<TaggedResource>(findByUuid(s.index, uuid),
      { body: update },
      { dirty: true });
    sanityCheck(source);
    a && isTaggedResource(source);
    return s;
  })
  .add<EditResourceParams>("OVERWRITE_RESOURCE", function (s, a) {
    let uuid = a.payload.uuid;
    let original = findByUuid(s.index, uuid);
    original.body = a.payload.update as typeof original.body;
    original.dirty = true;
    sanityCheck(original);
    a && isTaggedResource(original);
    return s;
  })
  .add<TaggedResource>("INIT_RESOURCE", function (s, a) {
    let tr = a.payload;
    let uuid = tr.uuid;
    addToIndex(s.index, tr.kind, tr.body, uuid);
    findByUuid(s.index, uuid).dirty = true;
    sanityCheck(tr);
    return s;
  })
  .add<DeprecatedSync>("FETCH_SYNC_OK", function (state, action) {
    let p = action.payload;
    state = emptyState();
    let { index } = state;
    // TODO: Try doing something fancier.
    addAllToIndex(index, "farm_events", p["farm_events"]);
    addAllToIndex(index, "images", p["images"]);
    addAllToIndex(index, "logs", p["logs"]);
    addAllToIndex(index, "peripherals", p["peripherals"]);
    addAllToIndex(index, "plants", p["plants"]);
    addAllToIndex(index, "points", p["points"]);
    addAllToIndex(index, "regimen_items", p["regimen_items"]);
    addAllToIndex(index, "regimens", p["regimens"]);
    addAllToIndex(index, "sequences", p["sequences"]);
    addAllToIndex(index, "tool_bays", p["tool_bays"]);
    addAllToIndex(index, "tool_slots", p["tool_slots"]);
    addAllToIndex(index, "tools", p["tools"]);
    addAllToIndex(index, "users", p["users"]);
    state.loaded = true;
    return state;
  })
// .add<TaggedPeripheral>("PUSH_PERIPHERAL", function (s, a) {
//   sanityCheck(tr);
//   return s;
// })

interface HasID {
  id?: number | undefined;
}
function addAllToIndex<T extends HasID>(i: ResourceIndex, kind: ResourceName, all: T[]) {
  all.map(function (tr) {
    return addToIndex(i, kind, tr, descriptiveUUID(tr.id, kind));
  });
}

function addToIndex<T>(index: ResourceIndex,
  kind: ResourceName,
  body: T,
  uuid: string) {
  let tr: TaggedResource = { kind, body, uuid } as any; // TODO: Fix this :(
  sanityCheck(tr);
  index.all.push(tr.uuid);
  index.byKind[tr.kind].push(tr.uuid);
  if (tr.body.id) { index.byKindAndId[tr.kind + "." + tr.body.id] = tr.uuid; }
  index.references[tr.uuid] = tr;
}

let removeUUID = (tr: TaggedResource) => (uuid: string) => uuid !== tr.uuid;
export function joinKindAndId(kind: ResourceName, id: number | undefined) {
  return descriptiveUUID(id, kind);
}

function removeFromIndex(index: ResourceIndex, tr: TaggedResource) {
  index.all = index.all.filter(removeUUID(tr));
  index.byKind[tr.kind].filter(removeUUID(tr));
  let key = joinKindAndId(tr.kind, tr.body.id)
  delete index.byKindAndId[key]
  delete index.references[tr.uuid];
}

function whoops(origin: string, kind: string) {
  let msg = `${origin}/${kind}: No handler written for this one yet.`
  throw new Error(msg);
}

export function findByUuid(index: ResourceIndex, uuid: string): TaggedResource {
  let x = index.references[uuid];
  if (isUndefined(x)) {
    throw new Error("BAD UUID- CANT FIND RESOURCE: " + uuid);
  } else {
    return x as TaggedResource;
  }
}
