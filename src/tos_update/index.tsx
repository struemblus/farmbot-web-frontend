import * as React from "react";
import { render } from "react-dom";
import * as axios from "axios";
import { t, init } from "i18next";
import "../npm_addons";
import { detectLanguage } from "../i18n";
import "../css/_index.scss";
import "../npm_addons";

interface Props { };
interface State { };


export class Wow extends React.Component<Props, State> {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("Component did mount.");
    }

    set(name: string) {
        return function (event: React.FormEvent<HTMLInputElement>) {
            let state: { [name: string]: string } = {};
            state[name] = (event.currentTarget).value;
            this.setState(state);
        };
    }

    submit(e: React.SyntheticEvent<HTMLInputElement>) {
        e.preventDefault();
        axios
            .put<{}>("/CHANGE_THIS", { FOO: "bar" })
            .then(resp => {
                window.location.href = "/";
            })
            .catch(error => {
                console.log("Unhandled error :(");
            });
    }

    render() {
        return <div className="static-page">
            <div className="all-content-wrapper">
                <div className="row">
                    <div className={`widget-wrapper col-md-6 col-md-offset-3 
                        col-sm-6 col-sm-offset-3`}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="widget-header">
                                    <h5>{t("Agree to Terms of Service")}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <form onSubmit={this.submit.bind(this)}>
                                <div className="col-sm-12">
                                    <div className="widget-content">
                                        <div className="input-group">
                                            <label>{t("Email")}</label>
                                            <input type="text"
                                                onChange={this.set("email")
                                                    .bind(this)}>
                                            </input>
                                            <label>
                                                {t("Password")}
                                            </label>
                                            <input type="password"
                                                onChange={this.set(
                                                    "password")
                                                    .bind(this)}>
                                            </input>
                                            <label>
                                                {t("I Agree")}
                                            </label>
                                            <input type="checkbox"
                                                onChange={() => { alert("TODO") }} />
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <button className={`button-like 
                                                    button green login`}>
                                                    {t("Reset")}
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
        </div>;
    }
}

detectLanguage().then((config) => {
    init(config, (err, t) => {
        let node = document.createElement("DIV");
        node.id = "root";
        document.body.appendChild(node);

        let reactElem = React.createElement(Wow, {});
        let domElem = document.getElementById("root");

        if (domElem) {
            render(reactElem, domElem);
        } else {
            throw new Error(t("Add a div with id `root` to the page first."));
        };
    });
});