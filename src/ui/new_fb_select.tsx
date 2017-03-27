import * as React from "react";
import { DropDownItem } from "./fb_select";

interface Props {
  className: string;
  placeholder: string;
  id: string;
  isOpen: boolean;
  value: DropDownItem | undefined;
};

type State = {};

type OptionComponent = React.ComponentClass<DropDownItem>
  | React.StatelessComponent<DropDownItem>;

export interface SelectState {
  touched: boolean;
  label: string;
  isOpen: boolean;
  value: string | number | undefined;
}

/** Used as a placeholder for a selection of "none" when allowEmpty is true. */
export const NULL_CHOICE: DropDownItem = Object.freeze({
  label: "None",
  value: ""
});

export class NewFBSelect extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = { touched: false };
  }

  render() {
    let { placeholder, isOpen } = this.props;
    return <div className={"select " + (this.props.className || "")}>
      <div className="select-search-container">
        <input type="text"
          placeholder={placeholder || "Search..."}
          id={this.props.id || ""} />
      </div>
      <div className={"select-results-container is-open-" + !!isOpen}>

      </div>
    </div>;
  }
}
