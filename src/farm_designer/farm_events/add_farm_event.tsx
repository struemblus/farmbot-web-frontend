import * as React from "react";
import { t } from "i18next";
import { AddEditFarmEventProps, TaggedExecutable } from "../interfaces";
import * as moment from "moment";
import { connect } from "react-redux";
import { mapStateToPropsAddEdit, } from "./map_state_to_props_add_edit";
import { init } from "../../api/crud";
import { EditFEForm } from "./farm_event_form";
import { betterCompact } from "../../util";
import { TaggedSequence, TaggedRegimen } from "../../resources/tagged_resources";
import { entries } from "../../resources/util";

@connect(mapStateToPropsAddEdit)
export class AddFarmEvent extends React.Component<AddEditFarmEventProps, {}> {
  get sequences() { return betterCompact(entries(this.props.sequencesById)); }
  get regimens() { return betterCompact(entries(this.props.regimensById)); }
  get executables() {
    return ([] as TaggedExecutable[])
      .concat(this.sequences)
      .concat(this.regimens);
  }
  get executable(): TaggedExecutable | undefined {
    return _.sample(this.executables);
  }
  componentDidMount() {
    if (this.executable) {
      console.log("Init here.")
      // let action = init({
      //   kind: "farm_events",
      //   dirty: true,
      //   saving: false,
      //   body: {
      //     start_time: string;
      //     time_unit: TimeUnit;
      //     executable_id: number;
      //     executable_type: ExecutableType;
      //   }
      // })
      // this.props.dispatch()
    } else {
      console.log("Dissuade user from creating a farm event.")
    }
  }
  render() {
    return <EditFEForm farmEvent={fe}
      repeatOptions={this.props.repeatOptions}
      executableOptions={this.props.executableOptions}
      dispatch={this.props.dispatch}
      findExecutable={this.props.findExecutable}
      title={t("Add Farm Event")} />;
  }
}
