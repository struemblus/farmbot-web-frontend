import * as React from "react";
import { DropDownItem } from "./fb_select";

type Props = {};
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
    return <div className={"select " + (className || "")}>
      <div className="select-search-container">
        <input type="text"
          onChange={this.updateInput}
          onFocus={this.open}
          onBlur={this.maybeClose}
          placeholder={placeholder || "Search..."}
          value={this.value().label}
          id={this.props.id || ""} />
      </div>
      <div className={"select-results-container is-open-" + !!isOpen}>
        {renderList(this.filterByInput())}
      </div>
    </div>;
  }
}
