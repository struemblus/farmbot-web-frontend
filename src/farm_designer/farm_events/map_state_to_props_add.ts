import { FarmEvent } from "../interfaces";
import { Everything } from "../../interfaces";
import * as moment from "moment";
import { DropDownItem } from "../../ui";
import { t } from "i18next";

export interface AddFarmEventProps {
  selectOptions: DropDownItem[];
  repeatOptions: DropDownItem[];
  formatDate(input: string): string;
  save(fe: Partial<FarmEvent>): void;
}

export function mapStateToPropsAdd(state: Everything): AddFarmEventProps {

  let formatDate = (input: string) => {
    return moment(input).format("YYYY-MM-DD");
  };

  let repeatOptions = [
    { label: "Do not repeat", value: "never" },
    { label: "minutes", value: "minutely" },
    { label: "hours", value: "hourly" },
    { label: "days", value: "daily" },
    { label: "weeks", value: "weekly" },
    { label: "months", value: "monthly" },
    { label: "years", value: "yearly" }
  ];

  let selectOptions: DropDownItem[] = [];

  state.sync.regimens.map((regimen, index) => {
    selectOptions.push({ label: t("REGIMENS"), heading: true });
    let item = { label: regimen.name, value: regimen.id };
    selectOptions.push(item);
  });

  state.sync.sequences.map((sequence, index) => {
    selectOptions.push({ label: t("SEQUENCES"), heading: true });
    let item = { label: sequence.name, value: sequence.id };
    selectOptions.push(item);
  });

  return {
    selectOptions,
    repeatOptions,
    formatDate,
    save(fe) {
      this.props.dispatch();
    }
  };
}

  // selectFromDropDown(e: SelectSequenceOrRegimenProps) {
  //   let { regimens, sequences } = this.props;

  //   /* Depending on the kind chosen, place that in the state tree
  //   /* e.value is the id of the node */
  //   switch (e.kind) {
  //     case "Regimen":
  //       let regimen = _.findWhere(regimens.all, { id: e.value });
  //       this.props.dispatch(selectSequenceOrRegimen(regimen));
  //       break;

  //     case "Sequence":
  //       let sequence = _.findWhere(sequences.all, { id: e.value });
  //       this.props.dispatch(selectSequenceOrRegimen(sequence));
  //       break;

  //     default:
  //       throw new Error("Error in the executable dropdown.");
  //   }
  // }
