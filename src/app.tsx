import * as React from "react";
import { NavBar } from "./nav";
import { Everything, Sync, Log } from "./interfaces";
import { init, error } from "./ui";
import { connect } from "react-redux";
import { Spinner } from "./spinner";
import { AuthState } from "./auth/interfaces";
import { BotState } from "./devices/interfaces";

/** Remove 300ms delay on touch devices - https://github.com/ftlabs/fastclick */
let fastClick = require("fastclick");
fastClick.attach(document.body);

/** For the logger module */
init();

/** If the sync object takes more than 10s to load, the user will be granted
 * access into the app, but still warned. */
const TIMEOUT_MESSAGE = `App could not be fully loaded, 
we recommend you try refreshing the page.`;

interface AppProps {
  dispatch: Function;
  loaded: boolean;
  logs: Log[];
  auth: AuthState | undefined;
  bot: BotState;
}

// TODO: Need to get `location` into `state_to_props` somehow...
interface FixMePlease extends AppProps {
  location: { pathname: string; };
}

function mapStateToProps(props: Everything): AppProps {
  let dispatch = props.dispatch;
  let logs = Object
    .values(props.resources.logs.byId)
    .map(L => {
      if(L) {
        return L;
      } else {
        throw new Error("Never")
      }
    });
  return {
    dispatch,
    auth: props.auth,
    bot: props.bot,
    logs,
    loaded: props.resources.loaded
  };
}

@connect(mapStateToProps)
export default class App extends React.Component<FixMePlease, {}> {
  componentDidMount() {
    setTimeout(() => {
      if (!this.props.loaded) {
        this.props.dispatch({ type: "SYNC_TIMEOUT_EXCEEDED" });
        error(TIMEOUT_MESSAGE, "Warning");
      }
    }, 10000);
  }

  render() {
    let syncLoaded = this.props.sync.loaded;
    return <div className="app">
      <NavBar
        auth={this.props.auth}
        bot={this.props.bot}
        location={this.props.location}
        dispatch={this.props.dispatch}
        logs={this.props.logs} />
      {!syncLoaded && <Spinner radius={33} strokeWidth={6} />}
      {syncLoaded && this.props.children}
    </div>;
  }
}
