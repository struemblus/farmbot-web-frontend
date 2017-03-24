import * as React from "react";
import { t } from "i18next";
import { FarmEvent, AddEditFarmEventProps, isTimeUnit } from "../interfaces";
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
import { TaggedFarmEvent } from "../../resources/tagged_resources";

@connect(mapStateToPropsAddEdit)
export class AddFarmEvent extends React.Component<AddEditFarmEventProps, {}> {
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

  modify = (e: DropDownItem | React.SyntheticEvent<HTMLInputElement>) => {
    console.log(e);
  }

  render() {
    let { formatDate, formatTime, selectOptions } = this.props;
    return <div className={`panel-container magenta-panel
            add-farm-event-panel`}>
      <div className="panel-header magenta-panel">
        <p className="panel-title">
          <BackArrow /> {t("Add Farm Event")}
        </p>
      </div>
      <div className="panel-content">
        <label>{t("Sequence or Regimen")}</label>
        <FBSelect
          list={selectOptions}
          onChange={(e) => this.modify(e)} />
        <label>{t("Starts")}</label>
        <Row>
          <Col xs={6}>
            <BlurableInput
              type="date"
              className="add-event-start-date"
              name="start_date"
              value={formatDate((new Date()).toString())}
              onCommit={(e) => this.modify(e)}
            />
          </Col>
          <Col xs={6}>
            <BlurableInput type="time"
              className="add-event-start-time"
              name="start_time"
              value={formatTime((new Date()).toString())}
              onCommit={(e) => this.modify(e)} />
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
              onCommit={(e) => this.modify(e)} />
          </Col>
          <Col xs={8}>
            <FBSelect
              list={this.props.repeatOptions}
              onChange={(e) => this.modify(e)} />
          </Col>
        </Row>
        <label>{t("Until")}</label>
        <Row>
          <Col xs={6}>
            <BlurableInput
              type="date"
              className="add-event-end-date"
              name="end_date"
              value={formatDate((new Date()).toString())}
              onCommit={(e) => this.modify(e)} />
          </Col>
          <Col xs={6}>
            <BlurableInput
              type="time"
              name="end_time"
              className="add-event-end-time"
              value={formatTime((new Date()).toString())}
              onCommit={(e) => this.modify(e)} />
          </Col>
        </Row>
        <button className="magenta button-like"
          onClick={() => this.props.save(this.props.currentUuid)}>
          {t("Save")}
        </button>
      </div>
    </div>;
  }
}
