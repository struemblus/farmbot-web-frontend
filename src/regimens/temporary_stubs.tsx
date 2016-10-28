import { Regimen } from "./interfaces";
import { duration } from "moment";

let THIRTY_SIX_HOURS = duration(36, "hours").asMilliseconds();

let firstItem: Regimen = {
    id: -1,
    name: "Loading...",
    color: "gray",
    regimen_items: [
        {
            sequence: {
                id: -1,
                color: "gray",
                name: "Loading...",
                kind: "sequence",
                args: {},
                body: [],
                dirty: false
            },
            time_offset: THIRTY_SIX_HOURS
        },
    ]
};

let secondItem = _.clone(firstItem) as Regimen;
secondItem.name = "Second Item";
export let stubs: Regimen[] = [firstItem, secondItem];
