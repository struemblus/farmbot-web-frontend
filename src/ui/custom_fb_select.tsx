import * as React from "react";
import {
  TaggedResource,
  TaggedResourceBase
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

  state = { isOpen: true };

  toggleDropdown = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    let { isOpen } = this.state;
    let placeholder = this.props.placeholder || "Search...";
    let val = this.props.selectedItem && this.props.selectedItem.body.id;

    return <div className="select" onClick={this.toggleDropdown}>
      <div className="select-search-container">
        <input type="text"
          readOnly={true}
          placeholder={placeholder}
          value={val} />
      </div>
      <div
        className={"select-results-container is-open-" + !!isOpen}>
        {this.props.resourceList && this.props.resourceList.map(r => {
          return this.props.optionComponent && this.props.optionComponent(r);
        })}
      </div>
    </div>;
  }
}
