import * as React from "react";
import { botIsOnline } from "./actions";

const DEFAULT_MESSAGE =
  "This feature is unavailable when the device is offline.";

interface Props {
  fallback?: string | undefined;
  forceOpen?: boolean | undefined;
  children?: React.ReactNode;
}

export function MustBeOnline(props: Props) {
  let FALLBACK = props.fallback || "";
  return <div>
    {(botIsOnline() || props.forceOpen) ? props.children : FALLBACK}
  </div>
}

