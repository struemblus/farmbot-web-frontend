import * as React from "react";
import { TaggedResource, TaggedResourceBase } from "../resources/tagged_resources";

interface Props {
  /** Allow user to select no value. */
  allowEmpty?: boolean;
  /** Value to show. */
  selectedItem?: TaggedResource | undefined;
  /** Notifies component user that something was clicked. */
  onChange(selection: TaggedResource): void;
  /** All possible select options in TaggedResource format. */
  resourceList?: TaggedResource[];
  /** Text shown before user selection. */
  placeholder?: string | undefined;
  /** Determines whether the list of options should remain open. */
  forceOpen?: boolean;
  /** Custom built options to be rendered besides the default ones. */
  optionComponent?: OptionComponent;
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
  constructor() {
    super();
    this.state = { isOpen: false };
  }

  // get list() {
  //   let orig = this.props.list || this.props.resourceList;
  //   if (!orig) { throw new Error("Must give FBSelect a list of options."); }
  //   if (this.props.list && !this.props.resourceList) {
  //     return (this.props.allowEmpty) ? orig.concat([CUSTOM_NULL_CHOICE]) : orig;
  //   }
  // }

  get item() { return this.props.selectedItem || CUSTOM_NULL_CHOICE; }

  toggleDropdown = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    let { isOpen } = this.state;
    let placeholder = this.props.placeholder || "Search...";
    return <div className="select" onClick={this.toggleDropdown}>
      <div className="select-search-container">
        {/*<input type="text"
          readOnly={true}
          placeholder={placeholder}
          value={this.item.label} />*/}
      </div>
      <div className={"select-results-container is-open-" + !!isOpen}>
        {/* list */}
      </div>
    </div>;
  }
}
