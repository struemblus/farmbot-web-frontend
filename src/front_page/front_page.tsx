import * as React from "react";
import * as i18next from "i18next";
import * as axios from "axios";
import { AuthState } from "../auth/interfaces";
import { error as log } from "../ui";
import { prettyPrintApiErrors } from "../util";
import { API } from "../api";
import { Session } from "../session";
import { FrontPageState, FrontPageProps } from "./interfaces";

export class FrontPage extends React.Component<FrontPageProps, FrontPageState> {
    constructor() {
        super();
        this.state = {
            regEmail: "",
            regName: "",
            regPassword: "",
            regConfirmation: "",
            loginEmail: "",
            loginPassword: "",
            showServerOpts: false,
            serverURL: "",
            serverPort: ""
        };
        this.toggleServerOpts = this.toggleServerOpts.bind(this);
    }

    componentDidMount() {
        API.setBaseUrl(API.fetchBrowserLocation());
        this.setState({
            serverURL: API.fetchHostName(),
            serverPort: API.inferPort()
        });
    }

    set(name: string) {
        return function (event: React.FormEvent<HTMLInputElement>) {
            let state: { [name: string]: string } = {};
            state[name] = (event.currentTarget).value;
            this.setState(state);
        };
    }

    submitLogin(e: React.FormEvent<{}>) {
        e.preventDefault();
        let { loginEmail, loginPassword } = this.state;
        let payload = { user: { email: loginEmail, password: loginPassword } };
        if (this.state.showServerOpts) {
            API.setBaseUrl(API.fetchBrowserLocation());
        }
        axios.post<AuthState>(API.current.tokensPath, payload)
            .then(resp => {
                Session.put(resp.data);
                window.location.href = "/app/dashboard/controls";
            }).catch(error => {
                log(prettyPrintApiErrors(error));
            });
    }

    submitRegistration(e: React.FormEvent<{}>) {
        e.preventDefault();
        let { regEmail, regName, regPassword, regConfirmation } = this.state;
        let form = {
            user: {
                name: regName,
                email: regEmail,
                password: regPassword,
                password_confirmation: regConfirmation
            }
        };
        axios.post<AuthState>(API.current.usersPath, form).then(resp => {
            Session.put(resp.data);
            window.location.replace("/app/dashboard/controls");
        }).catch(error => {
            log(prettyPrintApiErrors(error));
        });
    }

    toggleServerOpts() {
        this.setState({ showServerOpts: !this.state.showServerOpts });
    }

    render() {
        let expandIcon = this.state.showServerOpts ? "minus" : "plus";
        let { toggleServerOpts } = this;
        return (
            <div className="front-page">
                <h1>
                    Welcome to the FarmBot Web App
                </h1>
                <h2 className="fb-desktop-show">
                    Setup, customize, and control FarmBot from your computer
                </h2>
                <h2 className="fb-tablet-show">
                    Setup, customize, and control FarmBot from your tablet
                </h2>
                <h2 className="fb-mobile-show">Setup, customize, and control
                FarmBot from your smartphone</h2>
                <div className="image-login-wrapper">
                    <div className="image-wrapper">
                        <img className="fb-desktop-show"
                            src="/app-resources/img/farmbot-desktop.png" />
                        <img className="fb-tablet-show"
                            src="/app-resources/img/farmbot-tablet.png" />
                    </div>
                    <div className="all-content-wrapper login-wrapper">
                        <div className="row">
                            <div className="widget-wrapper">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="widget-header">
                                            <h5>{i18next.t("Login")}</h5>
                                            <i className={`fa fa-${expandIcon}`}
                                                onClick={toggleServerOpts}>
                                            </i>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <form onSubmit={this.submitLogin.bind(this)}>
                                        <div className="col-sm-12">
                                            <div className="widget-content">
                                                <div className="input-group">
                                                    <label> {i18next.t("Email")} </label>
                                                    <input type="email"
                                                        onChange={this.set("loginEmail").bind(this)}>
                                                    </input>
                                                    <label>{i18next.t("Password")}</label>
                                                    <input type="password"
                                                        onChange={this.set("loginPassword").bind(this)}>
                                                    </input>
                                                    {this.state.showServerOpts && (
                                                        <div>
                                                            <label>{i18next.t("Server URL")}</label>
                                                            <input type="text"
                                                                onChange={this.set("serverURL").bind(this)}
                                                                value={this.state.serverURL}>
                                                            </input>
                                                            <label>{i18next.t("Server Port")}</label>
                                                            <input type="text"
                                                                onChange={this.set("serverPort").bind(this)}
                                                                value={this.state.serverPort}>
                                                            </input>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="row">
                                                    <div className="col-xs-6">
                                                        <p className="auth-link">
                                                            <a href={
                                                                "/users/password/new"
                                                            }>
                                                                {i18next.t("Reset password")}
                                                            </a>
                                                        </p>
                                                    </div>
                                                    <div className="col-xs-6">
                                                        <button className="button-like button green login">
                                                            {i18next.t("Login")}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="widget-wrapper">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="widget-header">
                                            <h5> {i18next.t("Create An Account")} </h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <form onSubmit={this.submitRegistration.bind(this)} >
                                            <div className="widget-content">
                                                <div className="input-group">
                                                    <label>{i18next.t("Email")} </label>
                                                    <input type="email" onChange={this.set("regEmail").bind(this)} ></input>
                                                    <label>Name</label>
                                                    <input type="text" onChange={this.set("regName").bind(this)}></input>
                                                    <label>Password</label>
                                                    <input type="password"
                                                        onChange={this.set("regPassword").bind(this)}>
                                                    </input>
                                                    <label>{i18next.t("Verfy Password")}</label>
                                                    <input type="password"
                                                        onChange={
                                                            this.set("regConfirmation").bind(this)}>
                                                    </input>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xs-6">
                                                    </div>
                                                    <div className="col-xs-6">
                                                        <div className="auth-button">
                                                            <button className="button-like button green create-account">
                                                                {i18next.t("Create Account")}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

