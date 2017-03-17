import { Everything } from "../interfaces";
import { BotState } from "../devices/interfaces";
import { AuthState } from "../auth/interfaces";
import { PeripheralState } from "./peripherals/interfaces";
// import { Props } from "./interfaces";

export interface Props {
  dispatch: Function;
  bot: BotState;
  auth: AuthState | undefined;
  peripherals: PeripheralState;
}

export function mapStateToProps(props: Everything): Props {
  let auth = props.auth;
  let dispatch = props.dispatch;
  let bot = props.bot;
  let peripherals = props.peripherals;

  return {
    dispatch,
    bot,
    auth,
    peripherals
  };
}

