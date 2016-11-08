import * as React from "react";
import { t } from "i18next";
import { BlurableInput } from "../blurable_input";

interface ChangePasswordPropTypes {
    set: (event: React.FormEvent<HTMLInputElement>) => void;
}

export class ChangePassword extends React.Component<ChangePasswordPropTypes, {}> {
    render() {
        let { set } = this.props;
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                    <div className="widget-wrapper">
                        <div className="row">
                            <div className="col-sm-12">
                                <button className="green button-like widget-control"
                                    type="button">{t("SAVE")}</button>
                                <div className="widget-header">
                                    <h5>{t("Change Password")}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <form>
                                <div className="col-sm-12">
                                    <div className="widget-content">
                                        <div className="form-group row">
                                            <label className="col-sm-3">
                                                {t("Old Password")}
                                            </label>
                                            <div className="col-sm-9">
                                                <BlurableInput
                                                    onCommit={set}
                                                    name="oldPwd"
                                                    value=""
                                                    type="password"
                                                    />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3">
                                                {t("New Password")}
                                            </label>
                                            <div className="col-sm-9">
                                                <BlurableInput
                                                    onCommit={set}
                                                    name="newPwd"
                                                    value=""
                                                    type="password"
                                                    />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3">
                                                {t("New Password")}
                                            </label>
                                            <div className="col-sm-9">
                                                <BlurableInput
                                                    onCommit={set}
                                                    name="checkNewPwd"
                                                    value=""
                                                    type="password"
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
        );
    }
}