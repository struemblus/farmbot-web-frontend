import { RpcBotLog as BotLog } from "./interfaces";

const schema = {
    message: "string",
    created_at: "number",
    channels: "object",
    meta: "object"
};

export function isBotLog(log: BotLog | {}): log is BotLog {
    let results: { [key: string]: boolean; } = {};
    _.forIn(log, (v: any, k: string) => results[k] = (
        typeof v === (schema as any)[k]));
    return !_(results).values().includes(false);
};
