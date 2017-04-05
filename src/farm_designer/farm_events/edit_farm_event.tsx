import * as React from "react";
import { t } from "i18next";
import { AddEditFarmEventProps } from "../interfaces";
import {
  BlurableInput,
  Col,
  Row,
  BackArrow,
  success,
  DropDownItem
} from "../../ui";
import * as moment from "moment";
import { connect } from "react-redux";
import { mapStateToPropsAddEdit } from "./map_state_to_props_add_edit";
import { history } from "../../history";
import { TaggedFarmEvent, TaggedSequence, TaggedRegimen } from "../../resources/tagged_resources";
import { save, destroy, edit } from "../../api/crud";
import { NewFBSelect } from "../../ui/new_fb_select";
import { EditFEForm } from "./farm_event_form";

@connect(mapStateToPropsAddEdit)
export class EditFarmEvent extends React.Component<AddEditFarmEventProps, {}> {
  get dispatch() { return this.props.dispatch; }

  redirect() {
    history.push("/app/designer/farm_events");
    return <div>Loading...</div>;
  }

  renderForm(fe: TaggedFarmEvent) {
    return <EditFEForm farmEvent={fe}
      repeatOptions={this.props.repeatOptions}
      selectOptions={this.props.selectOptions}
      dispatch={this.props.dispatch} />
  }

  render() {
    let fe = this.props.getFarmEvent();
    return fe ? this.renderForm(fe) : this.redirect();
  }
}
