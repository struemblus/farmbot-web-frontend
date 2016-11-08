import * as React from "react";
import { t } from "i18next";

interface ChangePasswordPropTypes {
    commitOldPwd: (event: React.FormEvent<HTMLInputElement>) => void;
    commitNewPwd: (event: React.FormEvent<HTMLInputElement>) => void;
}

export class ChangePassword extends React.Component<ChangePasswordPropTypes, {}> {
    render() {
        let { commitOldPwd, commitNewPwd } = this.props;
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                    <div className="widget-wrapper">
                        <div className="row">
                            <div className="col-sm-12">
                                <button className="green button-like widget-control"
                                    type="button">SAVE</button>
                                <div className="widget-header">
                                    <h5> {t("Change Password")} </h5>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <form>
                                <div className="col-sm-12">
                                    <div className="widget-content">
                                        <div className="form-group row">
                                            <label className="col-sm-3">
                                                Old Password
                                            </label>
                                            <div className="col-sm-9">
                                                <input type="password"
                                                    onChange={commitOldPwd} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3">
                                                New Password
                                            </label>
                                            <div className="col-sm-9">
                                                <input type="password"
                                                    onChange={commitNewPwd} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3">
                                                New Password
                                            </label>
                                            <div className="col-sm-9">
                                                <input type="password"
                                                    onChange={commitNewPwd} />
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