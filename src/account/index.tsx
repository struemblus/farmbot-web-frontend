import * as React from "react";
import { Navbar } from "../nav/navbar";
import { connect } from "react-redux";
import { Everything } from "../interfaces";
import { updateUser } from "./actions";
import { BlurableInput } from "../blurable_input";
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

    commitName(e: React.FormEvent<HTMLInputElement>) {
        let name = e.currentTarget.value;
        this.setState({ name });
    }

    commitEmail(e: React.FormEvent<HTMLInputElement>) {
        let email = e.currentTarget.value;
        this.setState({ email });
    }

    commitOldPwd(e: React.FormEvent<HTMLInputElement>) {
        let oldPwd = e.currentTarget.value;
        this.setState({ oldPwd });
    }

    commitNewPwd(e: React.FormEvent<HTMLInputElement>) {
        let newPwd = e.currentTarget.value;
        this.setState({ newPwd });
    }

    commitCheckNewPwd(e: React.FormEvent<HTMLInputElement>) {
        let checkNewPwd = e.currentTarget.value;
        this.setState({ checkNewPwd });
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
                            commitName={this.commitName.bind(this)}
                            commitEmail={this.commitEmail.bind(this)}
                            />
                        <ChangePassword
                            commitOldPwd={this.commitOldPwd.bind(this)}
                            commitNewPwd={this.commitEmail.bind(this)}
                            />
                        <DeleteAccount
                            commitOldPwd={this.commitOldPwd.bind(this)}
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
