import * as React from "react";
import { DropDownItem } from "../ui/beta_select";

type OptionComponent = React.ComponentClass<DropDownItem>
  | React.StatelessComponent<DropDownItem>;

export interface DropDownItem {
  /** Value passed to the onClick cb and also determines the "chosen" option. */
  value?: number;
  /** Name of the item shown in the list. */
  label: string;
  /** Component internal use only unless there's an edge case for it. */
  hidden?: boolean;
  /** To determine group-by styling on rendered lists. */
  heading?: boolean;
}

export interface SelectProps {
  /** The list of rendered options to select from. */
  dropDownItems: DropDownItem[];
  /** Determine whether the select list should always be open. */
  isOpen?: boolean;
  /** Custom JSX child rendered instead of a default item. */
  optionComponent?: OptionComponent;
  /** Optional className for `select`. */
  className?: string;
  /** Fires when option is selected. */
  onChange?: (newValue: DropDownItem) => void;
  /** Placeholder for the input. */
  placeholder?: string;
  /** Determines what label to show in the select box. */
  value?: number | null;
}

export interface SelectState {
  filter: string;
  dropDownItems: DropDownItem[];
  isOpen: boolean;
  value: number | null;
}

export class BetaSelect extends React.Component<SelectProps, Partial<SelectState>> {
  constructor() {
    super();
    this.state = {
      filter: "",
      dropDownItems: [],
      isOpen: false,
      value: null
    };
  }

  componentWillMount() {
    this.setState({
      dropDownItems: this.props.dropDownItems,
      isOpen: !!this.props.isOpen
    });
  }

  updateInput(e: React.SyntheticEvent<HTMLInputElement>) {
    this.setState({ filter: e.currentTarget.value });
  }

  open() {
    this.setState({ isOpen: true });
  }

  close() {
    this.setState({ isOpen: false });
  }

  handleSelectOption(option: DropDownItem) {
    (this.props.onChange || (() => { }))(option);
  }

  customizedItemList = () => {
    let { dropDownItems } = this.state;
    let { optionComponent, className } = this.props;
    let Custom = optionComponent as React.ReactType; // Trust me.
    console.log(`THIS IS THE PROBLEM RIGHT HERE:
    What?: The 'plant_inventory' page doesn't show the search bar.
    why?:  You forgot to put it back whilst refactoring.
    How?:  You see the search bar in #standardItemList()? Bring it over here, too!
    `);
    return <div className={"select " + (className || "")}>
      {(dropDownItems || []).map((p, i) => <Custom {...p} key={p.value || `@@KEY${i}`} />)}
    </div>;
  }

  standardItemList = () => {
    let { isOpen, dropDownItems } = this.state;
    let {placeholder, onChange, className} = this.props;
    let eachItem = (dropDownItems || []).map((option: DropDownItem) => {
      let { hidden, value, heading, label } = option;
      let classes = "select-result";
      if (hidden) { classes += " is-hidden"; }
      if (heading) { classes += " is-header"; }

      return <div key={value || label}
        className={classes}
        onClick={() => { (onChange || function () { })(option); }}>
        <label>{label}</label>
      </div>;
    });
    return <div className={"select " + (className || "")}>
      <div className="select-search-container">
        <input type="text"
          onChange={this.updateInput.bind(this)}
          onClick={this.open.bind(this)}
          placeholder={placeholder || "Search..."} />
      </div>
      <div className={"select-results-container is-open-" + !!isOpen}>
        {eachItem}
      </div>
    </div>;
  }

  render() {
    let filter = (this.state.filter || "").toUpperCase();
    let {dropDownItems } = this.state;
    let { optionComponent } = this.props;
    (dropDownItems || []).map((option: DropDownItem) => {
      if (option.label.toUpperCase().indexOf(filter) > -1) {
        option.hidden = false;
      } else {
        option.hidden = true;
      }
    });
    let fn = optionComponent ? this.customizedItemList : this.standardItemList;
    return fn();
  }
}
