import * as React from "react";
import { TickerParams } from "./interfaces";
import { Saucer } from "../ui";
import { t } from "i18next";

export function Ticker({ ticker }: TickerParams) {
  return <div className="status-ticker-wrapper">
    <Saucer color={ticker.color} />
    <label className="status-ticker-message">
      {ticker.message || t("Loading")}
    </label>
  </div>;
};
