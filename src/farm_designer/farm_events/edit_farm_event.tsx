import * as React from "react";
import { BackArrow } from "../back_arrow";
import { t } from "i18next";
import { Select, error } from "../../ui";
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
    addFarmEventStart,
    addFarmEventRepeat,
    addFarmEventUntil,
    addFarmEventTimeUnit,
    destroyFarmEvent
} from "../actions";
import * as _ from "lodash";
import * as moment from "moment";
import { Option } from "react-select";

interface EditFarmEventProps extends Everything {
    router: {
        push: Function;
    };
    params: {
        farm_event_id: string;
    };
}

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
export class EditFarmEvent extends React.Component<EditFarmEventProps, {}> {
    selectFromDropDown(e: SelectSequenceOrRegimenProps) {
        let { regimens, sequences } = this.props;

        /* Depending on the kind chosen, place that in the state tree
        /* e.value is the id of the node */
        switch (e.kind) {
            case "regimen":
                let regimen = _.findWhere(regimens.all, { id: e.value });
                this.props.dispatch(selectSequenceOrRegimen(regimen));
                break;

            case "sequence":
                let sequence = _.findWhere(sequences.all, { id: e.value });
                this.props.dispatch(selectSequenceOrRegimen(sequence));
                break;

            default:
                throw new Error("Error in the executable dropdown.");
        }
    }

    deleteEvent() {
        let id = parseInt(this.props.params.farm_event_id);
        this.props.dispatch(destroyFarmEvent(id));
        this.props.router.push("/app/designer/farm_events");
    }

    saveEvent() {
        let { farmEventToBeAdded, currentSequenceOrRegimen } = this.props.designer;
        if (currentSequenceOrRegimen && currentSequenceOrRegimen.kind) {
            farmEventToBeAdded.executable_id = currentSequenceOrRegimen.id;

            let kind = _.capitalize(`${currentSequenceOrRegimen.kind}`);

            farmEventToBeAdded.executable_type = kind;
            this.props.dispatch(saveFarmEvent(farmEventToBeAdded));
        } else {
            error("Select a sequence or Regimen.");
        }
    }

    updateStart(event: React.SyntheticEvent<HTMLInputElement>) {
        let { name, value } = event.currentTarget;
        this.props.dispatch(addFarmEventStart(name, value));
    }

    updateRepeat(event: React.SyntheticEvent<HTMLInputElement>) {
        let { value } = event.currentTarget;
        let newValue = parseInt(value);
        this.props.dispatch(addFarmEventRepeat(newValue));
    }

    updateTimeUnit(event: Option) {
        let { value } = event;
        this.props.dispatch(addFarmEventTimeUnit(value));
    }

    addFarmEventUntil(event: React.SyntheticEvent<HTMLInputElement>) {
        let { name, value } = event.currentTarget;
        this.props.dispatch(addFarmEventUntil(name, value));
    }

    render() {
        let { regimens, sequences } = this.props;
        let {
            start_time,
            repeat,
            time_unit,
            end_time
        } = this.props.designer.farmEventToBeAdded;

        let eventDate = start_time ? moment(start_time)
            .format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");

        /** TODO: Why is moment freaking out about this? */
        // let eventTime = start_time ? moment(start_time)
        //   .format("h:mm") : moment().format("h:mm");

        let eventUntilDate = end_time ? moment(end_time)
            .format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");

        let eventRepeat = repeat ? repeat : 0;
        let eventTimeUnit = time_unit ? time_unit : "";

        let regimenOptions: SelectOptionsParams[] = regimens.all.map(regimen => {
            return {
                label: regimen.name || "No regimens.",
                value: regimen.id || 0,
                kind: "regimen"
            };
        });

        /** Hack for group-by styling :( */
        regimenOptions.unshift({ label: "Regimens", value: 0, disabled: true });

        let sequencesOptions: SelectOptionsParams[] = sequences.all.map(seq => {
            return {
                label: seq.name || "No sequences.",
                value: seq.id || 0,
                kind: "sequence"
            };
        });

        /** Hack for group-by styling :( */
        sequencesOptions.unshift({ label: "Sequences", value: 0, disabled: true });

        /** For telling select box */
        let chosenNode = this.props.designer.currentSequenceOrRegimen;

        // minutely hourly daily weekly monthly yearly
        let repeatOptions = [
            { label: "Do not repeat", value: "never" },
            { label: "minutes", value: "minutely" },
            { label: "hours", value: "hourly" },
            { label: "days", value: "daily" },
            { label: "weeks", value: "weekly" },
            { label: "months", value: "monthly" },
            { label: "years", value: "yearly" }
        ];

        return <div className="panel-container magenta-panel edit-farm-event-panel">
            <div className="panel-header magenta-panel">
                <p className="panel-title">
                    <BackArrow /> {t("Edit Farm Event")}
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
                            value={eventDate}
                            onChange={this.updateStart.bind(this)} />
                    </div>
                    {/*<div className="col-xs-6">
                        <input type="time"
                        className="add-event-start-time"
                        name="start_time"
                        value={eventTime}
                        onChange={this.updateStart.bind(this)} />
                    </div>*/}
                </div>
                <label>{t("Repeats Every")}</label>
                <div className="row">
                    <div className="col-xs-4">
                        <input placeholder="(Number)"
                            type="text"
                            className="add-evet-repeat-frequency"
                            name="repeat"
                            value={eventRepeat}
                            onChange={this.updateRepeat.bind(this)} />
                    </div>
                    <div className="col-xs-8">
                        <Select
                            options={repeatOptions}
                            name="time_unit"
                            value={eventTimeUnit}
                            onChange={this.updateTimeUnit.bind(this)} />
                    </div>
                </div>
                <label>{t("Until")}</label>
                <div className="row">
                    <div className="col-xs-6">
                        <input
                            type="date"
                            className="add-event-end-date"
                            name="until_date"
                            value={eventUntilDate}
                            onChange={this.addFarmEventUntil.bind(this)} />
                    </div>
                    <div className="col-xs-6">
                        <input
                            type="time"
                            name="until_time"
                            onChange={this.addFarmEventUntil.bind(this)} />
                    </div>
                </div>
                <button className="magenta button-like"
                    onClick={this.saveEvent.bind(this)}>
                    {t("Save")}
                </button>
                <button className="red button-like"
                    onClick={this.deleteEvent.bind(this)}>
                    {t("Delete")}
                </button>
            </div>
        </div>;
    }
}
