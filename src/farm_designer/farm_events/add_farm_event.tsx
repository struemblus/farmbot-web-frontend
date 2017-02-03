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
import { selectSequenceOrRegimen, saveFarmEvent } from "../actions";
import * as _ from "lodash";
import * as moment from "moment";

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
      time: new Date(),
      icon: "leaf",
      desc: "Weed",
      repeat: 1000,
      time_unit: "daily",
      executable_type: "Sequence",
      executable_id: 1
    };
    this.props.dispatch(saveFarmEvent(NOT_REAL_DATA));
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

    return <div className="panel-container magenta-panel add-farm-event-panel">
      <div className="panel-header magenta-panel">
        <p className="panel-title">
          <BackArrow />Add Farm Event
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

        <label>{t("Parameters")}</label>
        <table>
          <tr>
            <td></td>
          </tr>
        </table>

        <label>{t("Starts")}</label>
        <div className="row">
          <div className="col-xs-6">
            <input type="date"
              className="add-event-start-date" />
          </div>
          <div className="col-xs-6">
            <input type="time" className="add-event-start-time" />
          </div>
        </div>
        <label>{t("Repeats Every")}</label>
        <div className="row">
          <div className="col-xs-4">
            <input placeholder="2"
              type="text"
              className="add-evet-repeat-frequency" />
          </div>
          <div className="col-xs-8">
            <select className="add-event-repeat-period">
              <option value="none">Does not repeat</option>
              <option value="minutes">minutes</option>
              <option value="hours">hours</option>
              <option value="days">days</option>
              <option value="weeks">weeks</option>
              <option value="months">months</option>
            </select>
          </div>
        </div>
        <label>{t("Until")}</label>
        <div className="row">
          <div className="col-xs-6">
            <input placeholder="Today"
              type="text"
              className="add-event-end-date" />
          </div>
          <div className="col-xs-6">
            <select className="add-event-end-time">
              <option value="1430">2:30pm</option>
              <option value="1700">5:00pm</option>
            </select>
          </div>
        </div>
        <button className="magenta button-like"
          onClick={this.saveEvent.bind(this)}>
          Save
        </button>
      </div>
    </div>;
  }
}
