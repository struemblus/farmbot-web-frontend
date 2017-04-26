import * as React from "react";
import {
  TaggedResource,
  TaggedResourceBase,
  TaggedPlant
} from "../resources/tagged_resources";

interface Props {
  /** Allow user to select no value. */
  allowEmpty?: boolean;
  /** Value to show. */
  selectedItem?: TaggedResource | undefined;
  /** Notifies component user that something was clicked. */
  onChange?(selection: TaggedResource): void;
  /** All possible select options in TaggedResource format. */
  resourceList?: TaggedResource[];
  /** Text shown before user selection. */
  placeholder?: string | undefined;
  /** Determines whether the list of options should remain open. */
  forceOpen?: boolean;
  /** Custom built options to be rendered besides the default ones. */
  optionComponent(tr: TaggedResource): JSX.Element;
}

type State = {
  isOpen: boolean;
  input: string;
}

type OptionComponent =
  | React.ComponentClass<TaggedResource>
  | React.StatelessComponent<TaggedResource>

export interface CustomSelectState {
  isOpen: boolean;
}

/** Used as a placeholder for a selection of "none" when allowEmpty is true. */
export const CUSTOM_NULL_CHOICE: TaggedResourceBase = {
  kind: "users",
  uuid: "--never",
  body: {},
  dirty: false,
  saving: false
};

export class CustomFBSelect extends React.Component<Props, Partial<State>> {

  state = { isOpen: true, input: "" };

  handleChange = (input: string) => this.setState({ input });

  toggleDropdown = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    let { isOpen } = this.state;
    let placeholder = this.props.placeholder || "Search...";
    let val = this.props.selectedItem && this.props.selectedItem.body.id;
    let shouldToggle = this.props.forceOpen ? _.noop : this.toggleDropdown;
    let list = this.props.resourceList;

    return <div className="select" onClick={shouldToggle}>
      <div className="select-search-container">
        <input type="text"
          placeholder={placeholder}
          value={val}
          onChange={(e) => this.handleChange(e.currentTarget.value)} />
      </div>
      <div
        className={"select-results-container is-open-" + !!isOpen}>
        {list && list.map((x: TaggedPlant) => {
          let comp = this.props.optionComponent;
          let name = x.body.name.toLowerCase();
          let input = this.state.input.toLowerCase();
          let condition = name.includes(input);
          return condition && comp && comp(x);
        })}
      </div>
    </div>;
  }
}
