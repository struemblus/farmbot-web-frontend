import { AuthState } from "../auth/interfaces";
import { BotState } from "../devices/interfaces";
import { Sync } from "../interfaces";

export interface NavButtonProps {
    auth: AuthState | undefined;
    dispatch: Function;
    bot: BotState;
    onClick?: () => void;
}

export interface DropDownProps {
    auth: AuthState | undefined;
    onClick?: () => void;
    sync: Sync;
}

export interface NavBarState {
    mobileNavExpanded?: boolean;
    tickerExpanded?: boolean;
}

export interface NavBarProps {
  location: { pathname: string; };
  sync: Sync;
  bot: BotState;
  auth: AuthState | undefined;
  dispatch: Function;
}
