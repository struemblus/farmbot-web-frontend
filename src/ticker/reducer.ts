import { generateReducer } from "../generate_reducer";
import { TickerState } from "./interfaces";
import { ReduxAction } from "../interfaces";
import { RpcBotLog } from "../devices/interfaces";
import * as i18next from "i18next";

let YELLOW = "#fd6",
    RED = "#e66",
    GREEN = "#6a4",
    BLUE = "#4286f4";

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
    .add<{}>("LOGIN_OK", change(YELLOW, "Logged in"))
    .add<{}>("LOGIN_ERR", change(RED, "Bad login"))
    .add<{}>("FETCH_PLANTS_START", change(YELLOW, "Fetching plants"))
    .add<{}>("FETCH_PLANTS_OK", change(GREEN, "Done fetching plants"))
    .add<{}>("FETCH_PLANTS_ERR", change(RED, "Error fetching plants"))
    .add<{}>("FETCH_SEQUENCES_OK", change(GREEN, "Done fetching sequences"))
    .add<{}>("FETCH_DEVICE_ERR", change(RED, "Can't connect to MQTT server"))
    .add<{}>("BOT_SYNC_OK", change(GREEN, "Bot Status OK"))
    .add<RpcBotLog>("BOT_LOG", (s, a) => {
        if (a.payload.channels.indexOf("ticker") != -1) {
            return { color: BLUE, message: a.payload.message, show: true };
        } else {
            return s;
        }
    });
