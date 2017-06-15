import * as React from "react";
import { Row, Col } from "../../ui/index";
import { FBSelect } from "../../ui/new_fb_select";
import { t } from "i18next";
import { DropDownItem } from "../../ui/fb_select";
import { list } from "./tz_list";
import { inferTimezone } from "./guess_timezone";

const CHOICES: DropDownItem[] = list.map(x => ({ label: x, value: x }));

interface TZSelectorProps {
  currentTimezone: string | undefined;
  onUpdate(ts: string): void;
}

export class TimezoneSelector extends React.Component<TZSelectorProps, {}> {
  dropdownList = (): DropDownItem[] => {
    return [];
  }

  selectedItem = (): DropDownItem => {
    let tz = inferTimezone(this.props.currentTimezone);
    if (tz) {
      return { label: tz, value: tz };
    } else {
      this.props.onUpdate(tz);
      return { label: "Loading...", value: "---" };
    }
  }

  itemSelected = (d: DropDownItem): void => {
    if (_.isString(d.value)) {
      this.props.onUpdate(d.value);
    }
  }

  render() {
    return <FBSelect list={CHOICES}
      selectedItem={this.selectedItem()}
      onChange={this.itemSelected} />;
  }
}
