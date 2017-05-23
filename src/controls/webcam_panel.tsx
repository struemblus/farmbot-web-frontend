import * as React from "react";
import { Widget, WidgetHeader } from "../ui";
import { WebcamPanelState } from "./interfaces";
import { PLACEHOLDER_FARMBOT } from "../images/index";
import { showUrl } from "./show_url";
import { t } from "i18next";
import { Props } from "./state_to_props";
import { changeDevice } from "../devices/actions";
import { ToolTips } from "../constants";

export
  class WebcamPanel
  extends React.Component<Props, Partial<WebcamPanelState>> {

  constructor() {
    super();
    this.state = { isEditingCameraURL: false, url: "" };
  }

  toggleCameraURLEdit = () => {
    this.setState({ isEditingCameraURL: !this.state.isEditingCameraURL });
  }

  clearURL = () => {
    this
      .props
      .dispatch(changeDevice(this.props.account, { webcam_url: "" }));
    this.setState({ url: "" });
    (document.querySelector(".webcam-url-input") as HTMLInputElement).focus();
  }

  saveURL = () => {
    let update = { webcam_url: this.state.url };
    this
      .props
      .dispatch(changeDevice(this.props.account, update));
    this.setState({ isEditingCameraURL: false });
  }

  render() {
    let fallback = PLACEHOLDER_FARMBOT;
    let custom = this.props.account.body.webcam_url;
    let url = custom || fallback;
    let dirty = !!this.props.bot.dirty;
    let { isEditingCameraURL } = this.state;

    return <Widget>
      <WidgetHeader title="Camera" helpText={ToolTips.WEBCAM_SAVE}>
        {isEditingCameraURL ?
          <button className="green" onClick={this.saveURL}>
            {t("Save")}
          </button>
          :
          <button className="gray" onClick={this.toggleCameraURLEdit}>
            {t("Edit")}
          </button>
        }
      </WidgetHeader>
      {isEditingCameraURL && (
        <div>
          <label>{t("Set Webcam URL:")}</label>
          <button
            className="clear-webcam-url-btn"
            onClick={this.clearURL}>
            <i className="fa fa-times"></i>
          </button>
          <input type="text"
            onChange={e => this.setState({ url: e.currentTarget.value })}
            placeholder="http://"
            value={this.state.url || this.props.account.body.webcam_url}
            className="webcam-url-input" />
        </div>
      )}
      {showUrl(url, dirty)}
    </Widget>
  }
}
