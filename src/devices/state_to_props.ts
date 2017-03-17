import { Everything } from "../interfaces";
import { Props } from "./interfaces";

export function mapStateToProps(props: Everything): Props {
  let auth = props.auth;
  let bot = props.bot;
  let dispatch = props.dispatch;
  let sync = props.sync;

  return {
    auth,
    bot,
    dispatch,
    sync
  };
}

