import * as React from "react";
import { SyncStatus } from "farmbot/dist";

interface Props {
  status: SyncStatus | undefined;
  lockOpen?: boolean;
  fallback?: string | undefined;
  children?: React.ReactNode;
}

export function MustBeOnline({ children, lockOpen, fallback }: Props) {
  if (lockOpen || (status && (status === "unknown"))) {
    return <div> {children} </div>;
  } else {
    return <div> {fallback || ""} </div>;
  }
}
