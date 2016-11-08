import * as React from "react";
import { Navbar } from "../nav/navbar";
import { connect } from "react-redux";
import { Everything } from "../interfaces";
import { Settings } from "./settings";
import { ChangePassword } from "./change_password";
import { DeleteAccount } from "./delete_account";

class XAccount extends React.Component<Everything, {}> {

    set(name: string) {
        return function (event: React.FormEvent<HTMLInputElement>) {
            let state: { [name: string]: string } = {};
            state[name] = (event.currentTarget).value;
            this.setState(state);
        };
    }

    render() {
        return (
            <div>
                <Navbar { ...this.props } />
                <div className="all-content-wrapper account">
                    <Settings set={this.set} user={this.props.auth.user} />
                    <ChangePassword set={this.set} user={this.props.auth.user} />
                    <DeleteAccount set={this.set} user={this.props.auth.user} />
                </div>
            </div>
        );
    }
}

export let Account = connect((state: Everything) => state)(XAccount);
