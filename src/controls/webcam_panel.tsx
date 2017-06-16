import * as React from "react";
import { t } from "i18next";
import { Widget, WidgetHeader } from "../ui";
import { WebcamPanelState, Props } from "./interfaces";
import { PLACEHOLDER_FARMBOT } from "../images/index";
import { showUrl } from "./show_url";
import { changeDevice } from "../devices/actions";
import { ToolTips } from "../constants";

export class WebcamPanel
  extends React.Component<Props, Partial<WebcamPanelState>> {

  state: WebcamPanelState = { isEditing: false, url: "https://" };

  edit = () => this.setState({ isEditing: !this.state.isEditing });

  clearURL = () => {
    this
      .props
      .dispatch(changeDevice(this.props.account, { webcam_url: "" }));
    this.setState({ url: "https://" });
    (document.querySelector(".webcam-url-input") as HTMLInputElement).focus();
  }

  saveURL = () => {
    let update = { webcam_url: this.state.url };
    this
      .props
      .dispatch(changeDevice(this.props.account, update));
    this.setState({ isEditing: false });
  }

  render() {
    let url = this.props.account.body.webcam_url || PLACEHOLDER_FARMBOT;
    let dirty = !!this.props.bot.dirty;
    let { isEditing } = this.state;

    return <Widget>
      <WidgetHeader title="Camera" helpText={ToolTips.WEBCAM_SAVE}>
        {isEditing ?
          <button className="green" onClick={this.saveURL}>
            {t("Save")}
          </button>
          :
          <button className="gray" onClick={this.edit}>
            {t("Edit")}
          </button>
        }
      </WidgetHeader>
      {isEditing &&
        <div>
          <label>{t("Set Webcam URL:")}</label>
          <button
            className="clear-webcam-url-btn"
            onClick={this.clearURL}>
            <i className="fa fa-times"></i>
          </button>
          <input
            type="text"
            onChange={e => this.setState({ url: e.currentTarget.value })}
            placeholder="https://"
            value={this.state.url || this.props.account.body.webcam_url}
            className="webcam-url-input" />
        </div>
      }
      {showUrl(url, dirty)}
    </Widget>
  }
}
