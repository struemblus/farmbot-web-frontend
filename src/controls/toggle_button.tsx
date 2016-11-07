import * as React from "react";
import * as i18next from "i18next";

interface ToggleButtonProps {
  /** Function that is executed when the toggle button is clicked */
  toggleAction: () => void;
  toggleval: number | string | undefined;
}

interface ToggleButtonState {

}

// <ToggleButton toggleval="false" />
export class ToggleButton extends React.Component<ToggleButtonProps, ToggleButtonState> {
  caption() {
    let captions: { [s: string]: string | undefined } = {
      "0": i18next.t("no"),
      "false": i18next.t("no"),
      "off": i18next.t("no"),
      "1": i18next.t("yes"),
      "true": i18next.t("yes"),
      "on": i18next.t("yes"),
      "undefined": "---",
      "-1": "---"
    };
    let togval = String(this.props.toggleval);
    return captions[togval] || "---";
  }

  css() {
    let redCSS = "button-like red";
    let greenCSS = "button-like green";
    let yellowCSS = "button-like yellow";

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
    return <button className={this.css()}
      onClick={this.props.toggleAction}> {this.caption()}</button>;
  }
}
