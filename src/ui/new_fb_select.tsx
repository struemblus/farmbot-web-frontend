import * as React from "react";

type OptionComponent = React.ComponentClass<DropDownItem>
  | React.StatelessComponent<DropDownItem>;

export interface DropDownItem {
  /** Name of the item shown in the list. */
  label: string;
  /** Value passed to the onClick cb and also determines the "chosen" option. */
  value: number | string;
  /** Component internal use only unless there's an edge case for it. */
  hidden?: boolean;
  /** To determine group-by styling on rendered lists. */
  heading?: boolean;
}

export interface SelectProps {
  /** The list of rendered options to select from. */
  list: DropDownItem[];
  /** Determines what label to show in the select box. */
  query?: string | undefined;
  /** Determine whether the select list should always be open. */
  isOpen?: boolean;
  /** Custom JSX child rendered instead of a default item. */
  optionComponent?: OptionComponent;
  /** Optional className for `select`. */
  className?: string;
  /** Fires when option is selected. */
  onSelect?: (newValue: DropDownItem) => void;
  /** Fires when user enters text */
  onQueryChange?: (userInput: string) => void;
  /** Placeholder for the input. */
  placeholder?: string;
  /** Allows user to have a non-selected value. */
  allowEmpty?: boolean;
}

export interface SelectState {
  label: string;
  isOpen: boolean;
  value: string | number | undefined;
}

export class NewFBSelect extends React.Component<SelectProps, Partial<SelectState>> {
  constructor() {
    super();
    this.state = {
      label: "",
      isOpen: false
    };
  }

  componentDidMount() {
    this.setState({
      isOpen: !!this.props.isOpen
    });
  }

  updateInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;
    this.setState({ label: value });
    this.props.onQueryChange && this.props.onQueryChange(value);
  }

  open = () => {
    this.setState({
      isOpen: true,
      label: ""
    });
  }

  /** Closes the dropdown ONLY IF the developer has not set this.props.isOpen to
   * true, since that would indicate the developer wants it to always be open.
    */
  maybeClose = () => {
    // let isValidChoice = () => {
    //   return this
    //     .props
    //     .list
    //     .map(x => x.label)
    //     .includes(JSON.stringify(this.state.label));
    // };
    // ============ PROBABLY NOT THE SUSPECT:
    // if (!this.state.label || !isValidChoice()) {
    //   // handle user clearing out the form.
    //   this.setState({ label: this.props.value || "" });
    // };

    this.setState({ isOpen: (this.props.isOpen || false) });
    // ============ PROBABLY NOT THE SUSPECT^^
  }

  handleSelectOption = (option: DropDownItem) => {
    // ============ PROBABLY NOT THE SUSPECT:
    this.setState({
      label: option.label,
      isOpen: false,
      value: option.value
    });
  }

  custItemList = (items: DropDownItem[]) => {
    if (this.props.optionComponent) {
      let Comp = this.props.optionComponent;
      return items
        .map((p, i) => {
          return <div onMouseDown={() => { this.handleSelectOption(p); }}
            key={p.value}>
            <Comp {...p}
            />
          </div>;
        });
    } else {
      throw new Error(`You called custItemList() when props.optionComponent was
      falsy. This should never happen.`);
    }
  }

  normlItemList = (items: DropDownItem[]) => {
    return items.map((option: DropDownItem, i) => {
      let { hidden, heading, label } = option;
      let classes = "select-result";
      if (hidden) { classes += " is-hidden"; }
      if (heading) { classes += " is-header"; }
      // TODO: Put this in a shared function when we finish debugging callbacks.
      return <div key={option.value}
        className={classes}
        onMouseDown={() => { this.handleSelectOption(option); }}>
        <label>{label}</label>
      </div>;
    });
  }

  filterByInput = () => {
    return this.props.list.filter((option: DropDownItem) => {
      let query = (this.state.label || "").toUpperCase();
      return (option.label.toUpperCase().indexOf(query) > -1);
    });
  }

  render() {
    let { className, optionComponent, placeholder } = this.props;
    let { isOpen } = this.state;
    // Dynamically choose custom vs. standard list item JSX based on options:
    let renderList = (optionComponent ? this.custItemList : this.normlItemList);
    if (this.props.allowEmpty) {
      console.log(`Value of "label" is: ${this.state.label || "UNDEFINED"}.`);
    }
    return <div className={"select " + (className || "")} style={{ border: "1px solid red" }}>
      <div className="select-search-container">
        <input type="text"
          onChange={this.updateInput}
          onFocus={this.open}
          onBlur={this.maybeClose}
          placeholder={placeholder || "Search..."}
          value={this.state.label} />
      </div>
      <div className={"select-results-container is-open-" + !!isOpen}>
        {renderList(this.filterByInput())}
      </div>
    </div>;
  }
}
