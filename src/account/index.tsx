import * as React from "react";
import { Navbar } from "../nav/navbar";
import { connect } from "react-redux";
import { Everything } from "../interfaces";
import { updateUser } from "./actions";
import { Settings } from "./settings";
import { DeleteAccount } from "./delete_account";
import { ChangePassword } from "./change_password";
import { UserAccountUpdate } from "./interfaces";

class XAccount extends React.Component<Everything, UserAccountUpdate> {
    constructor(props: Everything) {
        super();
        this.state = {};
    }

    componentDidMount() {
        if (this.props.auth.user) {
            let { name, email } = this.props.auth.user;
            this.setState({ name, email });
        }
    }

    set(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value });
    }

    saveUser() {
        this.props.dispatch(updateUser(this.state));
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
