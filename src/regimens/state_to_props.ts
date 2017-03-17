import { Everything } from "../interfaces";
import { Props } from "./interfaces";

export function mapStateToProps(props: Everything): Props {
  let dispatch = props.dispatch;
  let sequences = props.sequences;
  let bulkScheduler = props.bulkScheduler;
  let auth = props.auth;
  let bot = props.bot;
  let regimens = props.regimens;

  return {
    dispatch,
    sequences,
    bulkScheduler,
    auth,
    bot,
    regimens
  };
}

