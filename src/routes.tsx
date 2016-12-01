import "./css/_index.scss";
import * as React from "react";
import {
    Provider
} from "react-redux";
import {
    Redirect,
    IndexRoute,
    Route,
    Router,
    RedirectFunction,
    RouterState
} from "react-router";
import App from "./app";
import { Controls } from "./controls/controls";
import { Devices } from "./devices/devices";
import { Sequences } from "./sequences/sequences";
import { Regimens } from "./regimens/index";
import { FarmDesigner } from "./farm_designer/farm_designer";
import { Account } from "./account";
import { Tools } from "./tools";
import { store } from "./redux/store";
import { history } from "./history";
import { Store } from "./redux/interfaces";
import { ready } from "./config/actions";
import { Session } from "./session";

interface RootComponentProps {
    store: Store;
}

export class RootComponent extends React.Component<RootComponentProps, {}> {

    requireAuth(_: RouterState, replace: RedirectFunction) {
        let { store } = this.props;
        if (Session.get()) { // has a previous session in cache
            if (store.getState().auth) { // Has session, logged in.
                return;
            } else { // Has session but not logged in (returning visitor).
                store.dispatch(ready());
            };
        } else { // Not logged in yet.
            location.href = "/";
        }
    };

    // Thanks @noahMiller and @jpierson (Github) for this wonderful fix!
    // Reference:
    //  https://github.com/reactjs/react-router/issues/2704#issuecomment-174067923.

    /*
      /app                => App
      /app/designer?p1&p2 => FarmDesigner
      /app/controls       => Controls
      /app/devices        => Devices
      /app/sequences      => Sequences
      /app/regimens       => Regimens
      /app/tools          => Tools
    */

    routes = <Route path="app" component={App}>
        <Route path="designer(?:p1&?:id)"
            component={FarmDesigner}
            onEnter={this.requireAuth.bind(this)} />
        <Route path="controls"
            component={Controls}
            onEnter={this.requireAuth.bind(this)} />
        <Route path="devices"
            component={Devices}
            onEnter={this.requireAuth.bind(this)} />
        <Route path="sequences"
            component={Sequences}
            onEnter={this.requireAuth.bind(this)} />
        <Route path="regimens"
            component={Regimens}
            onEnter={this.requireAuth.bind(this)} />
        <Route path="account"
            component={Account}
            onEnter={this.requireAuth.bind(this)} />
        <Route path="tools"
            component={Tools}
            onEnter={this.requireAuth.bind(this)} />
        <IndexRoute
            component={Controls} />
        <Redirect path="*" to="controls" />
    </Route>;

    render() {
        return <Provider store={store}>
            <Router history={history}>
                {this.routes}
            </Router>
        </Provider>;
    }
}
