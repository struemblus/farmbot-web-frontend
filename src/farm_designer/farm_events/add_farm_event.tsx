import * as React from "react";
import { BackArrow } from "../back_arrow";
import { t } from "i18next";
import { Select } from "../../ui";
import { connect } from "react-redux";
import {
  Everything,
  SelectOptionsParams,
  CustomOptionProps
} from "../../interfaces";
import { SelectSequenceOrRegimenProps } from "../interfaces";
import {
  selectSequenceOrRegimen,
  saveFarmEvent,
  changeFarmEventValue
} from "../actions";
import * as _ from "lodash";
import * as moment from "moment";
import { Option } from "react-select";

class OptionComponent extends React.Component<CustomOptionProps, {}> {
  handleMouseDown(e: React.SyntheticEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onSelect(this.props.option, e);
  };

  handleMouseEnter(e: React.SyntheticEvent<HTMLDivElement>) {
    this.props.onFocus(this.props.option, e);
  };

  handleMouseMove(e: React.SyntheticEvent<HTMLDivElement>) {
    if (this.props.isFocused) { return; };
    this.props.onFocus(this.props.option, e);
  };

  render() {
    return (
      <div className={this.props.className}
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}>
        {this.props.children}
      </div>
    );
  }
}

@connect((state: Everything) => state)
export class AddFarmEvent extends React.Component<Everything, {}> {
  selectFromDropDown(e: SelectSequenceOrRegimenProps) {
    let { regimens, sequences } = this.props;

    /* Depending on the kind chosen, place that in the state tree
    /* e.value is the id of the node */
    if (e.kind === "regimen") {
      let regimen = _.findWhere(regimens.all, { id: e.value });
      this.props.dispatch(selectSequenceOrRegimen(regimen));
    } else if (e.kind === "sequence") {
      let sequence = _.findWhere(sequences.all, { id: e.value });
      this.props.dispatch(selectSequenceOrRegimen(sequence));
    }
  }

  saveEvent() {
    let NOT_REAL_DATA = {
      end_time: "2099-02-17T18:19:20.000Z",
      executable_id: 73,
      executable_type: "Sequence",
      repeat: 4,
      start_time: "2015-02-17T15:16:17.000Z",
      time_unit: "minutely"
    };
    this.props.dispatch(saveFarmEvent(NOT_REAL_DATA));
  }

  updateEventWithInput(event: React.SyntheticEvent<HTMLInputElement>) {
    console.log(event.currentTarget.name);
    console.log(event.currentTarget.value);
  }

  updateEventWithSelect(event: Option) {
    console.log(event);
  }

  render() {
    let regimenOptions: SelectOptionsParams[] = this.props.regimens.all.map(regimen => {
      return {
        label: regimen.name || "No regimens.",
        value: regimen.id || 0,
        kind: "regimen"
      };
    });

    /** Hack for group-by styling :( */
    regimenOptions.unshift({ label: "Regimens", value: 0, disabled: true });

    let sequencesOptions: SelectOptionsParams[] = this.props.sequences.all.map(sequence => {
      return {
        label: sequence.name || "No sequences.",
        value: sequence.id || 0,
        kind: "sequence"
      };
    });

    /** Hack for group-by styling :( */
    sequencesOptions.unshift({ label: "Sequences", value: 0, disabled: true });

    /** For telling select box */
    let chosenNode = this.props.designer.currentSequenceOrRegimen;

    // minutely hourly daily weekly monthly yearly
    let repeatOptions = [
      { label: "Do not repeat", value: "" },
      { label: "minutes", value: "minutely" },
      { label: "hours", value: "hourly" },
      { label: "days", value: "daily" },
      { label: "weeks", value: "weekly" },
      { label: "months", value: "monthly" },
      { label: "years", value: "yearly" }
    ];

    return <div className="panel-container magenta-panel add-farm-event-panel">
      <div className="panel-header magenta-panel">
        <p className="panel-title">
          <BackArrow /> {t("Add Farm Event")}
        </p>
      </div>
      <div className="panel-content">
        <label>{t("Sequence or Regimen")}</label>
        <Select
          className="group-by"
          options={regimenOptions.concat(sequencesOptions)}
          optionComponent={OptionComponent}
          onChange={this.selectFromDropDown.bind(this)}
          value={(chosenNode || {}).id || 0} />

        {/*<label>{t("Parameters")}</label>*/}

        <label>{t("Starts")}</label>
        <div className="row">
          <div className="col-xs-6">
            <input type="date"
              className="add-event-start-date"
              name="start_date"
              onChange={this.updateEventWithInput.bind(this)} />
          </div>
          <div className="col-xs-6">
            <input type="time"
              className="add-event-start-time"
              name="start_time"
              onChange={this.updateEventWithInput.bind(this)} />
          </div>
        </div>
        <label>{t("Repeats Every")}</label>
        <div className="row">
          <div className="col-xs-4">
            <input placeholder="(Number)"
              type="text"
              className="add-evet-repeat-frequency"
              name="repeat"
              onChange={this.updateEventWithInput.bind(this)} />
          </div>
          <div className="col-xs-8">
            <Select
              options={repeatOptions}
              name="time_unit"
              onChange={this.updateEventWithSelect} />
          </div>
        </div>
        <label>{t("Until")}</label>
        <div className="row">
          <div className="col-xs-6">
            <input
              type="date"
              className="add-event-end-date"
              name="until_date"
              onChange={this.updateEventWithInput.bind(this)} />
          </div>
          <div className="col-xs-6">
            <input
              type="time"
              name="until_time"
              onChange={this.updateEventWithInput.bind(this)} />
          </div>
        </div>
        <button className="magenta button-like"
          onClick={this.saveEvent.bind(this)}>
          {t("Save")}
        </button>
      </div>
    </div>;
  }
}
