import * as React from "react";
import { TickerParams } from "./interfaces";
import { Saucer } from "../ui";
import { t } from "i18next";
import { Markdown } from "../ui";

export function Ticker({ ticker }: TickerParams) {
  return <div className="status-ticker-wrapper">
    <Saucer color={ticker.color} />
    <label className="status-ticker-message">
      <Markdown>{ticker.message.toString() || "Loading"}</Markdown>
    </label>
  </div>;
};
