import * as React from "react";
import { t } from "i18next";
import { BlurableInput } from "../blurable_input";

interface SettingsPropTypes {
    name: string;
    email: string;
    set: React.EventHandler<React.FormEvent<HTMLInputElement>>;
    save: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
}

export class Settings extends React.Component<SettingsPropTypes, {}> {
    render() {
        let { name, email, set, save } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                        <div className="widget-wrapper">
                            <div className="row">
                                <div className="col-sm-12">
                                    <button
                                        className="green button-like widget-control"
                                        type="button"
                                        onClick={save}>
                                        {t("SAVE")}
                                    </button>
                                    <div className="widget-header">
                                        <h5>{t("Account Settings")}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <form>
                                    <div className="col-sm-12">
                                        <div className="widget-content">
                                            <div className="form-group row">
                                                <label className="col-sm-3">
                                                    {t("Your Name")}
                                                </label>
                                                <div className="col-sm-9">
                                                    <BlurableInput
                                                        onCommit={set}
                                                        name="name"
                                                        value={`${name}`}
                                                        type="text"
                                                        />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3">
                                                    {t("Email")}
                                                </label>
                                                <div className="col-sm-9">
                                                    <BlurableInput
                                                        onCommit={set}
                                                        name="email"
                                                        value={`${email}`}
                                                        type="email"
                                                        />
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
        );
    }
}