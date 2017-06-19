import * as React from "react";
import { timezoneMismatch } from "../../devices/timezones/guess_timezone";

const WARNING = <span>Note: The selected timezone for your FarmBot is different
  than your local browser time..</span>;

interface TzWarningProps {
  deviceTimezone: string | undefined;
}

export function TzWarning({ deviceTimezone }: TzWarningProps) {
  return <div>
    {timezoneMismatch(deviceTimezone) ? WARNING : ""}
  </div>;
}
