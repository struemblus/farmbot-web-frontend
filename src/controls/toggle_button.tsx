import * as React from "react";
import * as i18next from "i18next";
import { ToggleButtonProps } from "./interfaces";

export class ToggleButton extends React.Component<ToggleButtonProps, {}> {
  caption() {
    let captions: { [s: string]: string | undefined } = {
      "0": i18next.t("no"),
      "false": i18next.t("no"),
      "off": i18next.t("no"),
      "1": i18next.t("yes"),
      "true": i18next.t("yes"),
      "on": i18next.t("yes"),
      "undefined": "🚫",
      "-1": "🚫"
    };
    let togval = String(this.props.toggleval);
    return captions[togval] || "---";
  }

  css() {
    if (this.props.disabled) { return "toggle-button gray"; }
    let redCSS = "toggle-button red";
    let greenCSS = "toggle-button green";
    let yellowCSS = "toggle-button yellow";

    let cssClasses: { [s: string]: string | undefined } = {
      "0": redCSS,
      "false": redCSS,
      "off": redCSS,
      "1": greenCSS,
      "true": greenCSS,
      "on": greenCSS,
      "undefined": yellowCSS
    };

    return cssClasses[String(this.props.toggleval)] || yellowCSS;
  }

  render() {
    let cb = () => { !this.props.disabled && this.props.toggleAction };
    return <button
      disabled={!!this.props.disabled}
      className={this.css()}
      onClick={cb}> {this.caption()}</button>;
  }
}
