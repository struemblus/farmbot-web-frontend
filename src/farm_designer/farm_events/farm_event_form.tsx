import * as React from "react";
import { TaggedFarmEvent, TaggedSequence, TaggedRegimen } from "../../resources/tagged_resources";
import { TimeUnit } from "../interfaces";
import { formatTime, formatDate } from "./map_state_to_props_add_edit";
import { BackArrow, BlurableInput, Col, Row, success } from "../../ui/index";
import { NewFBSelect } from "../../ui/new_fb_select";
import { destroy, save } from "../../api/crud";
import { t } from "i18next";
import { DropDownItem } from "../../ui/fb_select";
import { history } from "../../history";

interface Props {
  selectOptions: DropDownItem[];
  repeatOptions: DropDownItem[];
  farmEvent: TaggedFarmEvent;
  dispatch: Function;
}

interface State {

}

const STUB = { label: "STUB", value: 0 };
export class EditFEForm extends React.Component<Props, State> {
  get dispatch() { return this.props.dispatch; }
  get viewModel() { return destructureFarmEvent(this.props.farmEvent); }

  render() {
    let fe = this.props.farmEvent;

    return <div className="panel-container magenta-panel add-farm-event-panel">
      <div className="panel-header magenta-panel">
        <p className="panel-title"> <BackArrow /> {t("Edit Farm Event")} </p>
      </div>
      <div className="panel-content">
        <label>{t("Sequence or Regimen")}</label>
        <NewFBSelect
          list={this.props.selectOptions}
          onChange={_.noop}
          selectedItem={STUB} />
        <label>{t("Starts")}</label>
        <Row>
          <Col xs={6}>
            <BlurableInput
              type="date"
              className="add-event-start-date"
              name="start_date"
              value={this.viewModel.startDate}
              onCommit={_.noop} />
          </Col>
          <Col xs={6}>
            <BlurableInput type="time"
              className="add-event-start-time"
              name="start_time"
              value={this.viewModel.startTime}
              onCommit={_.noop} />
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
              value={this.viewModel.repeat}
              onCommit={_.noop} />
          </Col>
          <Col xs={8}>
            <NewFBSelect
              list={this.props.repeatOptions}
              onChange={_.noop}
              selectedItem={STUB} />
          </Col>
        </Row>
        <label>{t("Until")}</label>
        <Row>
          <Col xs={6}>
            <BlurableInput
              type="date"
              className="add-event-end-date"
              name="end_date"
              value={this.viewModel.endDate}
              onCommit={_.noop} />
          </Col>
          <Col xs={6}>
            <BlurableInput
              type="time"
              name="end_time"
              className="add-event-end-time"
              value={this.viewModel.endTime}
              onCommit={_.noop} />
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
}

function recombineFarmEventViewModel() { }

/** Breaks up a TaggedFarmEvent into a structure that can easily be used
 * by the edit form. */
function destructureFarmEvent(fe: TaggedFarmEvent): FarmEventViewModel {
  return {
    startDate: formatDate((fe.body.start_time || new Date()).toString()),
    startTime: formatTime((fe.body.start_time || new Date()).toString()),
    endDate: formatDate((fe.body.end_time || new Date()).toString()),
    endTime: formatTime((fe.body.end_time || new Date()).toString()),
    repeat: (fe.body.repeat || 0).toString(),
    timeUnit: "minutely",
    executableType: fe.body.executable_type,
    executableId: fe.body.executable_id
  }
}

interface FarmEventViewModel {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  repeat: string;
  timeUnit: TimeUnit;
  executableType: string;
  executableId: number;
}
