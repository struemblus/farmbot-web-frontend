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
import { TaggedFarmEvent } from "../../resources/tagged_resources";
import { save, destroy, edit } from "../../api/crud";
import { NewFBSelect } from "../../ui/new_fb_select";

@connect(mapStateToPropsAddEdit)
export class EditFarmEvent extends React.Component<AddEditFarmEventProps, {}> {
  get dispatch() { return this.props.dispatch; }

  redirect() {
    history.push("/app/designer/farm_events");
    return <div>Loading...</div>;
  }

  renderForm(fe: TaggedFarmEvent) {

    let { formatDate, formatTime } = this.props;

    /** Populate the "executable" drop down control. */
    let executable = (): DropDownItem => {
      switch (fe.body.executable_type) {
        case "Sequence":
          let s = this.props.sequencesById[fe.body.executable_id];
          return {
            label: (s && s.body.name) || "NOT FOUND",
            value: (s && s.body.id) || 0
          }
        case "Regimen":
          let r = this.props.regimensById[fe.body.executable_id];
          return {
            label: (r && r.body.name) || "NOT FOUND",
            value: (r && r.body.id) || 0
          }
        default:
          return { label: "None", value: 0 }
      }
    }

    let update = (field: keyof typeof fe.body) => (e: DropDownItem) => {
      console.log("TODO " + field)
    }

    let updateDate = (field: keyof typeof fe.body) => (e: DropDownItem) => {
      console.log("TODO " + field)
    }

    return <div className="panel-container magenta-panel add-farm-event-panel">
      <div className="panel-header magenta-panel">
        <p className="panel-title"> <BackArrow /> {t("Edit Farm Event")} </p>
      </div>
      <div className="panel-content">
        <label>{t("Sequence or Regimen")}</label>
        <NewFBSelect
          list={this.props.selectOptions}
          onChange={update("executable_id")}
          selectedItem={executable()} />
        <label>{t("Starts")}</label>
        <Row>
          <Col xs={6}>
            <BlurableInput
              type="date"
              className="add-event-start-date"
              name="start_date"
              value={formatDate((fe.body.start_time || new Date()).toString())}
              onCommit={(x) => buildSetter(fe, "start_time")} />
          </Col>
          <Col xs={6}>
            <BlurableInput type="time"
              className="add-event-start-time"
              name="start_time"
              value={formatTime((fe.body.start_time || new Date()).toString())}
              onCommit={(e) => this.updateTime(e)(fe)} />
          </Col>
        </Row>
        <label>{t("Repeats Every")}</label>
        <Row>
          <Col xs={4}>
            <BlurableInput
              placeholder="(Number)"
              type="number"
              className="add-event-repeat-frequency"
              name="repeat"
              value={(fe.body.repeat || 0).toString()}
              onCommit={this.updateForm} />
          </Col>
          <Col xs={8}>
            <NewFBSelect
              list={this.props.repeatOptions}
              onChange={(e) => this.updateRepeatSelect(e)(fe)}
              selectedItem={currentTimeUnit} />
          </Col>
        </Row>
        <label>{t("Until")}</label>
        <Row>
          <Col xs={6}>
            <BlurableInput
              type="date"
              className="add-event-end-date"
              name="end_date"
              value={formatDate((fe.body.end_time || new Date()).toString())}
              onCommit={updateDate("end_time")} />
          </Col>
          <Col xs={6}>
            <BlurableInput
              type="time"
              name="end_time"
              className="add-event-end-time"
              value={formatTime((fe.body.end_time || new Date()).toString())}
              onCommit={(e) => this.updateTime(e)(fe)} />
          </Col>
        </Row>
        <button className={`magenta button-like is-saving-${!!fe.saving}`}
          onClick={() => {
            this.dispatch(save(fe.uuid)).then(() => {
              history.push("/app/designer/farm_events");
              success("Saved farm event.", "Saved");
            });
          }}>
          {t("Save")}
        </button>
        <button className="red button-like"
          onClick={() => {
            this.dispatch(destroy(fe.uuid)).then(() => {
              history.push("/app/designer/farm_events");
              success("Deleted farm event.", "Deleted");
            });
          }}>
          {t("Delete")}
        </button>
      </div>
    </div>;
  }
  render() {
    let fe = this.props.getFarmEvent();
    return fe ? this.renderForm(fe) : this.redirect();
  }
}
