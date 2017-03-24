import * as React from "react";
import { t } from "i18next";
import {
  FarmEvent,
  AddEditFarmEventProps,
  isTimeUnit
} from "../interfaces";
import {
  FBSelect,
  BlurableInput,
  Col,
  Row,
  BackArrow,
  DropDownItem
} from "../../ui";
import * as moment from "moment";
import { connect } from "react-redux";
import { mapStateToPropsAddEdit } from "./map_state_to_props_add_edit";
import { hasKey } from "../../util";
import { TaggedFarmEvent } from "../../resources/tagged_resources";
import { history } from "../../history";
import { edit, save, destroy } from "../../api/crud";

@connect(mapStateToPropsAddEdit)
export class EditFarmEvent extends React.Component<AddEditFarmEventProps, {}> {
  emptyFarmEvent = (): TaggedFarmEvent => {
    return {
      uuid: "REDUCER_MUST_CHANGE_THIS",
      kind: "farm_events",
      body: {
        start_time: moment().toISOString(),
        time_unit: "daily",
        next_time: moment().toISOString(),
        executable_id: -999,
        executable_type: "Regimen"
      }
    }
  }

  render() {
    let fe = this.props.getFarmEvent(history.getCurrentLocation().pathname);
    let { formatDate, formatTime, selectOptions, dispatch } = this.props;
    return <div className={`panel-container magenta-panel
      add-farm-event-panel`}>
      <div className="panel-header magenta-panel">
        <p className="panel-title">
          <BackArrow /> {t("Edit Farm Event")}
        </p>
      </div>
      <div className="panel-content">
        <label>{t("Sequence or Regimen")}</label>
        <FBSelect
          list={this.props.selectOptions}
          onChange={(e) => {
            console.log(e); // TODO
          }}
          initialValue={{ label: "TO", value: "DO" }} />
        <label>{t("Starts")}</label>
        <Row>
          <Col xs={6}>
            <BlurableInput
              type="date"
              className="add-event-start-date"
              name="start_date"
              value={formatDate((fe.body.start_time || new Date()).toString())}
              onCommit={(e) => {
                dispatch(edit(fe, { start_time: e.currentTarget.value }))
              }} />
          </Col>
          <Col xs={6}>
            <BlurableInput type="time"
              className="add-event-start-time"
              name="start_time"
              value={formatTime((fe.body.start_time || new Date()).toString())}
              onCommit={(e) => {
                dispatch(edit(fe, { start_time: e.currentTarget.value }))
              }} />
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
              value={(0).toString()}
              onCommit={(e) => {
                dispatch(edit(fe, { repeat: e.currentTarget.value }));
              }} />
          </Col>
          <Col xs={8}>
            <FBSelect
              list={this.props.repeatOptions}
              onChange={(e) => {
                dispatch(edit(fe, { time_unit: e.value }));
              }}
              initialValue={{ label: "TO", value: "DO" }} />
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
              onCommit={(e) => {
                dispatch(edit(fe, { end_time: e.currentTarget.value }));
              }} />
          </Col>
          <Col xs={6}>
            <BlurableInput
              type="time"
              name="end_time"
              className="add-event-end-time"
              value={formatTime((fe.body.end_time || new Date()).toString())}
              onCommit={(e) => {
                dispatch(edit(fe, { end_time: e.currentTarget.value }));
              }} />
          </Col>
        </Row>
        <button className="magenta button-like"
          onClick={() => { dispatch(save(fe.uuid)) }}>
          {t("Save")}
        </button>
        <button className="red button-like"
          onClick={() => { dispatch(destroy(fe.uuid)) }}>
          {t("Delete")}
        </button>
      </div>
    </div>;
  }
}
