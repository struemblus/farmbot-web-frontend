import * as React from "react";

type OptionComponent = React.ComponentClass<DropDownItem>
  | React.StatelessComponent<DropDownItem>;

export interface DropDownItem {
  /** Name of the item shown in the list. */
  label: string;
  /** Value passed to the onClick cb and also determines the "chosen" option. */
  value?: number | string;
  /** Component internal use only unless there's an edge case for it. */
  hidden?: boolean;
  /** To determine group-by styling on rendered lists. */
  heading?: boolean;
}

export interface SelectProps {
  /** The list of rendered options to select from. */
  list: DropDownItem[];
  /** Determines what label to show in the select box. */
  value?: string | undefined;
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
  /** Allows user to have a non-selected value. */
  allowEmpty?: boolean;
}

export interface SelectState {
  label: string;
  isOpen: boolean;
  value: string | number | undefined;
}

export class FBSelect extends React.Component<SelectProps, Partial<SelectState>> {
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
    // PROBABLY OK ============
    this.setState({ label: e.currentTarget.value });
  }

  open = () => {
    // PROBABLY OK ====
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
    (this.props.onChange || (() => { }))(option);
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
          let key = this.generateKey(p, i);
          return <div onMouseDown={() => { this.handleSelectOption(p); }}
            key={key}>
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
      let key = this.generateKey(option, i);
      return <div key={key}
        className={classes}
        onMouseDown={() => { this.handleSelectOption(option); }}>
        <label>{label}</label>
      </div>;
    });
  }

  generateKey(p: DropDownItem, i: number) {
    let key = _.isUndefined(p.value) ? `${p.label}:@KEY${i}` : `${p.value}`;
    return key;
  }

  render() {
    let { className, optionComponent, placeholder } = this.props;
    let { isOpen } = this.state;
    // Dynamically choose custom vs. standard list item JSX based on options:
    let renderList = (optionComponent ? this.custItemList : this.normlItemList);
    if (this.props.allowEmpty) {
      console.log(`Value of "label" is: ${this.state.label || "UNDEFINED"}.`);
    }
    return <div className={"select " + (className || "")}>
      <div className="select-search-container">
        <input type="text"
          onChange={this.updateInput}
          onFocus={this.open}
          onBlur={this.maybeClose}
          placeholder={placeholder || "Search..."}
          value={this.state.label} />
      </div>
      <div className={"select-results-container is-open-" + !!isOpen}>
        {renderList(this.props.list)}
      </div>
    </div>;
  }
}
