import { generateReducer } from "../generate_reducer";
import { TickerState } from "./interfaces";
import { ReduxAction } from "../interfaces";
import { RpcBotLog } from "../devices/interfaces";
import * as i18next from "i18next";
import { store } from "../store";

let YELLOW = "#fd6",
    RED = "#e66",
    GREEN = "#6a4",
    BLUE = "#4286f4";

function firstPerson(color: string, message: string, show = true) {
    return function (s: TickerState, a: ReduxAction<{}>) {
        // TODO: HACK: This is such a hack, but I can't think of a
        // faster way to get it done and it's not a very critical part of the
        // system. PRs welcome. Help appreciated. In the meantime, #shipIt
        let n = _.get<string>(store.getState(), "bot.account.name", "Bot");
        message = i18next.t(`${n} is ${message}`);
        return { color, message, show };
    };
}

function change(color: string, message: string, show = true) {
    return function (s: TickerState, a: ReduxAction<{}>) {
        message = i18next.t(message);
        return { color, message, show };
    };
}

export let tickerReducer = generateReducer<TickerState>({
    message: "Please log in",
    color: "gray",
    show: true
})
    .add<{}>("LOGIN_OK", firstPerson(YELLOW, "logged in."))
    .add<{}>("LOGIN_ERR", change(RED, "Bad login"))
    .add<{}>("FETCH_PLANTS_START", firstPerson(YELLOW, "fetching plants."))
    .add<{}>("FETCH_PLANTS_OK", change(GREEN, "Done fetching plants"))
    .add<{}>("FETCH_PLANTS_ERR", firstPerson(RED, "unable to fetch plants."))
    .add<{}>("FETCH_SEQUENCES_OK", firstPerson(GREEN, "done fetching sequences."))
    .add<{}>("FETCH_DEVICE_ERR", change(RED, "Can't connect to MQTT server"))
    .add<{}>("BOT_SYNC_OK", change(GREEN, "Bot Status OK"))
    .add<string>("BOT_ERROR", (s, a) => {
        return { color: RED, message: a.payload, show: true };
    })
    .add<RpcBotLog>("BOT_LOG", (s, a) => {
        if (a.payload.channels.indexOf("ticker") != -1) {
            return { color: BLUE, message: a.payload.message, show: true };
        } else {
            return s;
        }
    });
