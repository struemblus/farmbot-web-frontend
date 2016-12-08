import * as React from "react";
import * as i18next from "i18next";
import * as axios from "axios";
import { AuthState } from "../auth/interfaces";
import { error as log, success, init as logInit } from "../ui";
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
            email: "",
            loginPassword: "",
            showServerOpts: false,
            serverURL: "",
            serverPort: "",
            forgotPassword: false
        };
        this.toggleServerOpts = this.toggleServerOpts.bind(this);
    }

    componentDidMount() {
        logInit();
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
        let { email, loginPassword, showServerOpts } = this.state;
        let payload = { user: { email, password: loginPassword } };
        if (showServerOpts) {
            API.setBaseUrl(API.fetchBrowserLocation());
        }
        axios.post<AuthState>(API.current.tokensPath, payload)
            .then(resp => {
                Session.put(resp.data);
                window.location.href = "/app/controls";
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
            let m = "Almost done! Check your email for the verification link.";
            success(i18next.t(m));
        }).catch(error => {
            log(prettyPrintApiErrors(error));
        });
    }

    toggleServerOpts() {
        this.setState({ showServerOpts: !this.state.showServerOpts });
    }

    toggleForgotPassword() {
        this.setState({ forgotPassword: !this.state.forgotPassword });
    }

    submitForgotPassword(e: React.SyntheticEvent<HTMLInputElement>) {
        e.preventDefault();
        let { email } = this.state;
        let data = { email };
        axios.post<{}>(API.current.passwordResetPath, data)
            .then(resp => {
                success("Email has been sent.", "Forgot Password");
                this.setState({ forgotPassword: false });
            }).catch(error => {
                log(prettyPrintApiErrors(error));
            });
    }

    render() {
        let { showServerOpts, forgotPassword } = this.state;
        let expandIcon = showServerOpts ? "minus" : "plus";
        let { toggleServerOpts } = this;
        return (
            <div className="static-page">
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
                        {!forgotPassword && (
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
                                                            onChange={this.set("email").bind(this)}>
                                                        </input>
                                                        <label>{i18next.t("Password")}</label>
                                                        <input type="password"
                                                            onChange={this.set("loginPassword").bind(this)}>
                                                        </input>
                                                        <a
                                                            className="forgot-password"
                                                            onClick={this.toggleForgotPassword.bind(this)}>
                                                            Forgot password?
                                                    </a>
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
                                                        <div className="col-xs-12">
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
                        )}
                        {forgotPassword && (
                            <div className="row">
                                <div className="widget-wrapper">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="widget-header">
                                                <h5>{i18next.t("Forgot Password")}</h5>
                                                <button
                                                    className="gray button-like"
                                                    type="button"
                                                    onClick={this.toggleForgotPassword.bind(this)}>
                                                    {i18next.t("BACK")}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <form onSubmit={this.submitForgotPassword.bind(this)}>
                                            <div className="col-sm-12">
                                                <div className="widget-content">
                                                    <div className="input-group">
                                                        <label>{i18next.t("Enter Email")}</label>
                                                        <input type="email"
                                                            onChange={this.set("email").bind(this)}>
                                                        </input>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xs-12">
                                                            <button className="button-like button green login">
                                                                {i18next.t("Send Password reset")}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
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
                                                    <div className="col-xs-12">
                                                        <button className="button-like button green create-account">
                                                            {i18next.t("Create Account")}
                                                        </button>
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

