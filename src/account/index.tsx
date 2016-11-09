import * as React from "react";
import { Navbar } from "../nav/navbar";
import { connect } from "react-redux";
import { Everything } from "../interfaces";
import { updateUser } from "./actions";
import { Settings } from "./settings";
import { DeleteAccount } from "./delete_account";
import { ChangePassword } from "./change_password";

interface AccountState {
    name?: string;
    email?: string;
    oldPwd?: string;
    newPwd?: string;
    checkNewPwd?: string;
}

class XAccount extends React.Component<Everything, AccountState> {
    constructor(props: Everything) {
        super();
        this.state = {
            name: "",
            email: "",
            oldPwd: "",
            newPwd: "",
            checkNewPwd: ""
        };
    }

    componentDidMount() {
        if (this.props.auth.user) {
            let { name, email } = this.props.auth.user;
            this.setState({ name, email });
        }
    }

    set(event: React.FormEvent<HTMLInputElement>) {
        let state: { [name: string]: string } = {};
        state[event.currentTarget.name] = (event.currentTarget).value;
        this.setState(state);
    }

    saveUser() {
        this.props.dispatch(updateUser({
            name: this.state.name,
            email: this.state.email
        }));
    }

    render() {
        if (this.props.auth.user) {
            return (
                <div>
                    <Navbar { ...this.props } />
                    <div className="all-content-wrapper account">
                        <Settings
                            name={`${this.state.name}`}
                            email={`${this.state.email}`}
                            set={this.set.bind(this)}
                            save={this.saveUser.bind(this)}
                            />
                        <ChangePassword
                            set={this.set.bind(this)}
                            />
                        <DeleteAccount
                            set={this.set.bind(this)}
                            />
                    </div>
                </div>
            );

        } else {
            return <div>Please Log In</div>;
        };
    }
}

export let Account = connect((state: Everything) => state)(XAccount);
