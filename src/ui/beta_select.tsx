import * as React from "react";
import { Link } from "react-router";

type OptionComponent = React.ComponentClass<SelectState> | React.StatelessComponent<SelectState>;

export interface Option {
  /** Value passed to the onClick cb and also determines the "chosen" option. */
  value: number;
  /** Name of the item shown in the list. */
  label: string;
  /** Component internal use only unless there's an edge case for it. */
  hidden?: boolean;
  /** Path for `Link`s. */
  pathTo?: string;
  /** Path params for `pathTo`. */
  pathParams?: string;
}

export interface SelectProps {
  /** The list of rendered options to select from. */
  options: {}[];
  /** Determine whether the select list should always be open. */
  isOpen?: boolean;
  /** Custom JSX child rendered instead of a default item. */
  optionComponent?: OptionComponent;
  /** Optional className for `select`. */
  className?: string;
  /** Fires when option is selected. */
  onChange?: (newValue: Option) => void;
}

interface SelectState {
  filter: string;
  // TODO: Figure out option interface layout
  options: {}[];
  isOpen: boolean;
  value: number | null;
}

export class BetaSelect extends React.Component<SelectProps, Partial<SelectState>> {
  constructor() {
    super();
    this.state = {
      filter: "",
      options: [],
      isOpen: false,
      value: null
    };
  }

  componentWillMount() {
    this.setState({ options: this.props.options });
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

  handleSelectOption(option: Option) {
    if (this.props.onChange) {
      this.props.onChange(option);
    }
  }

  render() {
    let filter = (this.state.filter || "").toUpperCase();

    if (this.state.options) {
      this.state.options.map((option: Option) => {
        if (option.label.toUpperCase().indexOf(filter) > -1) {
          option.hidden = false;
        } else {
          option.hidden = true;
        }
      });
    }

    let isOpen = this.props.isOpen ? true : this.state.isOpen;
    let className = this.props.className || "";
    return <div className={"select " + className}>

      <div className="select-search-container">
        <input type="text"
          onChange={this.updateInput.bind(this)}
          onClick={this.open.bind(this)}
          placeholder="Search..." />
      </div>

      <div className={"select-results-container is-open-" + isOpen}>
        {this.state.options &&
          this.state.options.map((option: Option) => {
            let isHidden = option.hidden ? " is-hidden" : "";

            return <Link to={option.pathTo + option.pathParams}
              key={option.value}>
              <div className={"select-result" + isHidden}
                onClick={() => {
                  this.handleSelectOption(option);
                  this.close();
                }}>
                <label>{option.label}</label>
              </div>
            </Link>;
          })}

        {/** TODO: This will obviously need some refactoring.
          *  optionComponent is harder than expected.
         */}
        {(
          (this.state.options || []).map((option: Option) => {
            let { optionComponent } = this.props;
            if (optionComponent && this.state.value) {

              let CustomComponent = optionComponent;
              let isHidden = option.hidden ? " is-hidden" : "";
              return <div className={"select-result" + isHidden}
                key={option.value}
                onClick={() => {
                  this.handleSelectOption(option);
                  this.close();
                }}>
                <CustomComponent isOpen={!!this.props.isOpen}
                  options={this.state.options || []}
                  filter={this.state.filter || ""}
                  value={this.state.value || null}
                />
              </div>;
            }
          })
        )}
      </div>

    </div>;
  }
}


