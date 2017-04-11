import * as React from "react";
import { botIsOnline } from "./actions";

interface Props {
  fallback?: string | undefined;
  children?: React.ReactNode;
}

export function MustBeOnline(props: Props) {
  let FALLBACK = props.fallback || "";
  let FORCE_OPEN = process.env.NODE_ENV === "development";
  return <div>
    {(botIsOnline() || FORCE_OPEN) ? props.children : FALLBACK}
  </div>
}

