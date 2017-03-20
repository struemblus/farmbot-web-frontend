import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import { selectAll } from "../resources/util";
import { history } from "../history";

export function mapStateToProps(props: Everything): Props {

  return {
    dispatch: props.dispatch,
    sequences: selectAll(props.resources.sequences),
    bulkScheduler: props.bulkScheduler,
    auth: props.auth,
    bot: props.bot,
    current: props.regimens.current,
    regimens: selectAll(props.resources.regimens),
    // TODO: This is definitely not right, figure out query objects
    param: history.getCurrentLocation().pathname.split("/")[3]
      || "Regimens"
  };
}

