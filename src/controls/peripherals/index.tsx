import * as React from "react";
import { PeripheralList } from "./peripheral_list";
import { PeripheralForm } from "./peripheral_form";
import { Widget, WidgetBody, WidgetHeader } from "../../ui";
import { PeripheralsProps } from "../../devices/interfaces";
import { PeripheralState } from "./interfaces";
import { t } from "i18next";
import { TaggedPeripheral } from "../../resources/tagged_resources";
import { initSave, saveAll } from "../../api/crud";
import { selectAllPeripherals } from "../../resources/selectors";

export class Peripherals extends React.Component<PeripheralsProps, PeripheralState> {
  constructor() {
    super();
    this.state = { isEditing: false };
  }

  getPinNumber = () => {
    return _(selectAllPeripherals(this.props.resources.index))
      .map(tr => tr.body.pin || 0)
      .max() + 1
  }

  emptyPeripheral = (): TaggedPeripheral => {
    return {
      uuid: "WILL_BE_CHANGED_BY_REDUCER",
      kind: "peripherals",
      body: {
        pin: this.getPinNumber(),
        label: "Peripheral " + (this.props.peripherals.length + 1)
      }
    }
  }

  render() {
    let { dispatch, peripherals } = this.props;
    let { isEditing } = this.state;
    return <Widget>
      <WidgetHeader title={"Peripherals"}
        helpText={`Use these toggle switches to control FarmBot's peripherals in 
      realtime. To edit and create new peripherals, press the EDIT button. Make 
      sure to turn things off when you're done!`}>
        <button
          className="gray button-like"
          type="button"
          onClick={() => this.setState({ isEditing: !isEditing })}>
          {isEditing ? t("Back") : t("Edit")}
        </button>
        <button
          hidden={!isEditing}
          className="green button-like"
          type="button"
          onClick={() => dispatch(saveAll(peripherals))}>
          {t("Save")}
        </button>
        <button
          hidden={!isEditing}
          className="green button-like"
          type="button"
          onClick={() => { dispatch(initSave(this.emptyPeripheral())) }}>
          <i className="fa fa-plus" />
        </button>
      </WidgetHeader>
      <WidgetBody>
        {isEditing &&
          <PeripheralForm peripherals={peripherals} dispatch={dispatch} />
        }
        {!isEditing &&
          <PeripheralList peripherals={peripherals} dispatch={dispatch} />
        }
      </WidgetBody>
    </Widget>;
  };
}
