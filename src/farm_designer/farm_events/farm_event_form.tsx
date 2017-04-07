import * as React from "react";
import { TaggedFarmEvent } from "../../resources/tagged_resources";
import { TimeUnit, ExecutableQuery, ExecutableType } from "../interfaces";
import {
  formatTime,
  formatDate,
  TightlyCoupledFarmEventDropDown
} from "./map_state_to_props_add_edit";
import {
  BackArrow,
  BlurableInput,
  Col,
  Row,
  success
} from "../../ui/index";
import { NewFBSelect } from "../../ui/new_fb_select";
import { destroy, save, edit } from "../../api/crud";
import { t } from "i18next";
import { DropDownItem } from "../../ui/fb_select";
import { history } from "../../history";
import * as moment from "moment";
import { betterMerge, fancyDebug } from "../../util";

type FormEvent = React.SyntheticEvent<HTMLInputElement>;
/** Seperate each of the form fields into their own interface. Recombined later
 * on save.
 */
interface FarmEventViewModel {
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  repeat: string;
  time_unit: string;
  executable_type: string;
  executable_id: string;
}
/** Breaks up a TaggedFarmEvent into a structure that can easily be used
 * by the edit form.
 * USE CASE EXAMPLE: We have a "date" and "time" field that are created from
 *                   a single "start_time" FarmEvent field. */
function destructureFarmEvent(fe: TaggedFarmEvent): FarmEventViewModel {
  return {
    start_date: formatDate((fe.body.start_time || new Date()).toString()),
    start_time: formatTime((fe.body.start_time || new Date()).toString()),
    end_date: formatDate((fe.body.end_time || new Date()).toString()),
    end_time: formatTime((fe.body.end_time || new Date()).toString()),
    repeat: (fe.body.repeat || 0).toString(),
    time_unit: fe.body.time_unit,
    executable_type: fe.body.executable_type,
    executable_id: (fe.body.executable_id || "").toString()
  }
}

/** Take a FormViewModel and recombine the fields into a Partial<FarmEvent>
 * that can be used to apply updates (such as a PUT request to the API). */
function recombine(vm: FarmEventViewModel): Partial<TaggedFarmEvent["body"]> {
  return {
    start_time: moment(vm.start_date + " " + vm.start_time).toISOString(),
    end_time: moment(vm.end_date + " " + vm.start_date).toISOString(),
    repeat: parseInt(vm.repeat, 10),
    time_unit: vm.time_unit as TimeUnit,
    executable_id: parseInt(vm.executable_id, 10),
    executable_type: vm.executable_type as ("Sequence" | "Regimen"),
  };
}

interface Props {
  executableOptions: TightlyCoupledFarmEventDropDown[];
  repeatOptions: DropDownItem[];
  farmEvent: TaggedFarmEvent;
  dispatch: Function;
  findExecutable: ExecutableQuery;
  title: string;
}

type State = Partial<FarmEventViewModel>;

export class EditFEForm extends React.Component<Props, State> {
  get dispatch() { return this.props.dispatch; }
  get viewModel() {
    return destructureFarmEvent(this.props.farmEvent);
  }

  get executable() {
    let t = this.fieldGet("executable_type");
    let id = parseInt(this.fieldGet("executable_id"));
    if (t === "Sequence" || t === "Regimen") {
      return this.props.findExecutable(t, id);
    } else {
      throw new Error(`${t} is not a valid executable_type`);
    }
  }

  constructor() {
    super();
    this.state = {};
  }

  executableSet = (e: TightlyCoupledFarmEventDropDown) => {
    if (e.value) {
      this.setState({
        executable_type: e.executable_type,
        executable_id: (e.value || "").toString()
      });
    }
  }

  executableGet = (): TightlyCoupledFarmEventDropDown => {
    let executable_type: ExecutableType =
      (this.executable.kind === "sequences") ? "Sequence" : "Regimen";
    return {
      value: this.executable.body.id || 0,
      label: this.executable.body.name,
      executable_type
    }
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
    let options = _.indexBy(this.props.repeatOptions, "value");
    return <div className="panel-container magenta-panel add-farm-event-panel">
      <div className="panel-header magenta-panel">
        <p className="panel-title"> <BackArrow /> {this.props.title} </p>
      </div>
      <div className="panel-content">
        <label>{t("Sequence or Regimen")}</label>
        <NewFBSelect
          list={this.props.executableOptions}
          onChange={this.executableSet}
          selectedItem={this.executableGet()} />
        <label>{t("Starts")}</label>
        <Row>
          <Col xs={6}>
            <BlurableInput
              type="date"
              className="add-event-start-date"
              name="start_date"
              value={this.fieldGet("start_date")}
              onCommit={this.fieldSet("start_date")} />
          </Col>
          <Col xs={6}>
            <BlurableInput type="time"
              className="add-event-start-time"
              name="start_time"
              value={this.fieldGet("start_time")}
              onCommit={this.fieldSet("start_time")} />
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
              onChange={(e) => this.setState({
                time_unit: (e.value || "hourly").toString()
              })}
              selectedItem={options[this.fieldGet("time_unit")]} />
          </Col>
        </Row>
        <label>{t("Until")}</label>
        <Row>
          <Col xs={6}>
            <BlurableInput
              type="date"
              className="add-event-end-date"
              name="end_date"
              value={this.fieldGet("end_date")}
              onCommit={this.fieldSet("end_date")} />
          </Col>
          <Col xs={6}>
            <BlurableInput
              type="time"
              name="end_time"
              className="add-event-end-time"
              value={this.fieldGet("end_time")}
              onCommit={this.fieldSet("end_time")} />
          </Col>
        </Row>
        <button className={`magenta is-saving-${!!fe.saving}`}
          onClick={this.commitViewModel}>
          {t("Save")}
        </button>
        <button className="red"
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
