import * as React from "react";
import { TaggedFarmEvent } from "../../resources/tagged_resources";
import { TimeUnit } from "../interfaces";
import { formatTime, formatDate } from "./map_state_to_props_add_edit";
import { BackArrow, BlurableInput, Col, Row, success } from "../../ui/index";
import { NewFBSelect } from "../../ui/new_fb_select";
import { destroy, save, edit } from "../../api/crud";
import { t } from "i18next";
import { DropDownItem } from "../../ui/fb_select";
import { history } from "../../history";
import * as moment from "moment";
import { betterMerge } from "../../util";

type FormEvent = React.SyntheticEvent<HTMLInputElement>;
/** Seperate each of the form fields into their own interface. Recombined later
 * on save.
 */
interface FarmEventViewModel {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  repeat: string;
  timeUnit: string;
  executableType: string;
  executableId: string;
}
/** Breaks up a TaggedFarmEvent into a structure that can easily be used
 * by the edit form.
 * USE CASE EXAMPLE: We have a "date" and "time" field that are created from
 *                   a single "start_time" FarmEvent field. */
function destructureFarmEvent(fe: TaggedFarmEvent): FarmEventViewModel {
  return {
    startDate: formatDate((fe.body.start_time || new Date()).toString()),
    startTime: formatTime((fe.body.start_time || new Date()).toString()),
    endDate: formatDate((fe.body.end_time || new Date()).toString()),
    endTime: formatTime((fe.body.end_time || new Date()).toString()),
    repeat: (fe.body.repeat || 0).toString(),
    timeUnit: "minutely",
    executableType: fe.body.executable_type,
    executableId: (fe.body.executable_id || "").toString()
  }
}

/** Take a FormViewModel and recombine the fields into a Partial<FarmEvent>
 * that can be used to apply updates (such as a PUT request to the API). */
function recombine(vm: FarmEventViewModel):
  Partial<TaggedFarmEvent["body"]> {
  return {
    start_time: moment(vm.startDate + " " + vm.startTime).toISOString(),
    end_time: moment(vm.endDate + " " + vm.startDate).toISOString(),
    repeat: parseInt(vm.repeat, 10),
    time_unit: vm.timeUnit as TimeUnit,
    executable_id: parseInt(vm.executableId, 10),
    executable_type: vm.executableType as ("Sequence" | "Regimen"),
  };
}

interface Props {
  selectOptions: DropDownItem[];
  repeatOptions: DropDownItem[];
  farmEvent: TaggedFarmEvent;
  dispatch: Function;
}
const STUB = { label: "STUB", value: 0 };
type State = Partial<FarmEventViewModel>;

export class EditFEForm extends React.Component<Props, State> {
  get dispatch() { return this.props.dispatch; }
  get viewModel() { return destructureFarmEvent(this.props.farmEvent); }

  constructor() {
    super();
    this.state = {};
  }

  changeExecutable = (e: DropDownItem) => {
    console.log("TODO - maybe need to pass heading data down");
  }

  fieldSet = (name: keyof State) => (e: FormEvent) => {
    this.setState({ [name]: e.currentTarget.value });
  }

  fieldGet = (name: keyof State): string => {
    return (this.state[name] || this.viewModel[name] || "").toString();
  }

  commitViewModel = () => {
    let partial = recombine(betterMerge(this.viewModel, this.state));
    this.dispatch(edit(this.props.farmEvent, partial));
    this.dispatch(save(this.props.farmEvent.uuid)).then(() => {
      history.push("/app/designer/farm_events");
      success("Saved farm event.", "Saved");
    });
  }

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
          onChange={this.changeExecutable}
          selectedItem={STUB} />
        <label>{t("Starts")}</label>
        <Row>
          <Col xs={6}>
            <BlurableInput
              type="date"
              className="add-event-start-date"
              name="start_date"
              value={this.fieldGet("startDate")}
              onCommit={this.fieldSet("startDate")} />
          </Col>
          <Col xs={6}>
            <BlurableInput type="time"
              className="add-event-start-time"
              name="start_time"
              value={this.fieldGet("startTime")}
              onCommit={this.fieldSet("startTime")} />
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
              value={this.fieldGet("repeat")}
              onCommit={this.fieldSet("repeat")} />
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
              value={this.fieldGet("endDate")}
              onCommit={this.fieldSet("endDate")} />
          </Col>
          <Col xs={6}>
            <BlurableInput
              type="time"
              name="end_time"
              className="add-event-end-time"
              value={this.fieldGet("endTime")}
              onCommit={this.fieldSet("endTime")} />
          </Col>
        </Row>
        <button className={`magenta button-like is-saving-${!!fe.saving}`}
          onClick={this.commitViewModel}>
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
