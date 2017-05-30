import * as React from "react";
import { DropDownItem } from "./fb_select";

interface Props {
  /** Value to show. */
  selectedItem: DropDownItem | undefined;
  /** Notifies component user that something was clicked. */
  onChange(selection: DropDownItem): void;
  /** All possible select options. */
  list: DropDownItem[];
  /** Allow user to select no value. */
  allowEmpty?: boolean;
  /** Text shown before user selection. */
  placeholder?: string | undefined;
}

type State = {
  isOpen: boolean;
}

export interface SelectState {
  isOpen: boolean;
}

type OptionComponent =
  | React.ComponentClass<DropDownItem>
  | React.StatelessComponent<DropDownItem>

/** Used as a placeholder for a selection of "none" when allowEmpty is true. */
export const NULL_CHOICE: DropDownItem = Object.freeze({
  label: "None",
  value: ""
});

export class FBSelect extends React.Component<Props, Partial<State>> {

  state: State = { isOpen: false };

  get list() {
    let orig = this.props.list;
    return (this.props.allowEmpty) ? orig.concat([NULL_CHOICE]) : orig;
  }

  get item() { return this.props.selectedItem || NULL_CHOICE; }

  toggleDropdown = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    let { isOpen } = this.state;
    let placeholder = this.props.placeholder || "Search...";
    return <div className="select" onClick={this.toggleDropdown}>
      <div className="select-search-container">
        <input type="text"
          readOnly={true}
          placeholder={placeholder}
          value={this.item.label} />
      </div>
      <div
        className={"select-results-container is-open-" + !!isOpen}>
        {this.list.map((option: DropDownItem, i) => {
          let { label } = option;
          return <div key={i}
            className="select-result"
            onMouseDown={() => {
              this.setState({ isOpen: false });
              this.props.onChange(option);
            }}>
            <label>{label}</label>
          </div>;
        })}
      </div>
    </div>;
  }
}
