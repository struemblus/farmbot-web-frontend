import { Everything } from "../interfaces";
import { BotState } from "../devices/interfaces";
import { AuthState } from "../auth/interfaces";
import { TaggedPeripheral } from "../resources/tagged_resources";
import { selectAllPeripherals } from "../resources/selectors";
import { RestResources } from "../resources/interfaces";

export interface Props {
  dispatch: Function;
  bot: BotState;
  auth: AuthState | undefined;
  peripherals: TaggedPeripheral[];
  resources: RestResources;
}

export function mapStateToProps(props: Everything): Props {
  let peripherals = selectAllPeripherals(props.resources.index);
  let resources = props.resources;

  return {
    dispatch: props.dispatch,
    bot: props.bot,
    auth: props.auth,
    resources,
    peripherals
  };
}

