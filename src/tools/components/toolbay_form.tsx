import * as React from "react";
import { ToolBay, ToolSlot, Tool, Props } from "../interfaces";
import {
  Widget,
  WidgetBody,
  WidgetHeader,
  FBSelect,
  DropDownItem,
  Col,
  Row,
  BlurableInput
} from "../../ui";
import { toggleEditingToolBays, addSlot, destroySlot } from "../actions";
import { t } from "i18next";

export class ToolBayForm extends React.Component<Props, Partial<ToolSlot>> {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
      z: 0
    };
  }
  changeToolSlotField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
  }

  changeToolSlotTool = (e: DropDownItem) => {
    console.log(e);
  }

  add = () => {
    this.props.dispatch(addSlot(this.state));
  }

  saveAll = () => {
    // this.props.dispatch(addToolSlot())
  }

  render() {
    let toggle = () => this.props.dispatch(toggleEditingToolBays());
    return <div>
      {this.props.toolBays.map(bay => {
        return <Widget key={bay.id}>
          <WidgetHeader
            helpText={t(`Toolbays are where you store your FarmBot Tools. Each 
              Toolbay has Slots that you can put your Tools in, which should be 
              reflective of your real FarmBot hardware configuration.`)}
            title={"ToolBay 1"}>
            <button
              className="gray button-like" onClick={toggle}>
              {t("Back")}
            </button>
            <button
              className="green button-like" onClick={() => { }}>
              {t("Save")}
            </button>
          </WidgetHeader>
          <WidgetBody>
            <Row>
              <Col xs={2}>
                <label>{t("Slot")}</label>
              </Col>
              <Col xs={2}>
                <label>{t("X")}</label>
              </Col>
              <Col xs={2}>
                <label>{t("Y")}</label>
              </Col>
              <Col xs={2}>
                <label>{t("Z")}</label>
              </Col>
              <Col xs={3}>
                <label>{t("Tool")}</label>
              </Col>
            </Row>
            {this.props.getToolSlots(bay.id).map(
              (slot: ToolSlot, index: number) => {
                return <Row key={slot.id}>
                  <Col xs={2}>
                    <label>{index + 1}</label>
                  </Col>
                  <Col xs={2}>
                    <BlurableInput
                      value={(slot.x || 0).toString()}
                      onCommit={this.changeToolSlotField}
                      type="number"
                    />
                  </Col>
                  <Col xs={2}>
                    <BlurableInput
                      value={(slot.y || 0).toString()}
                      onCommit={this.changeToolSlotField}
                      type="number"
                    />
                  </Col>
                  <Col xs={2}>
                    <BlurableInput
                      value={(slot.z || 0).toString()}
                      onCommit={this.changeToolSlotField}
                      type="number"
                    />
                  </Col>
                  <Col xs={3}>
                    <FBSelect
                      list={this.props.getToolOptions()}
                      initialValue={this.props.getChosenToolOption(slot.id)}
                      onChange={this.changeToolSlotTool}
                    />
                  </Col>
                  <Col xs={1}>
                    <button
                      className="red button-like"
                      onClick={() => { }}>
                      <i className="fa fa-times" />
                    </button>
                  </Col>
                </Row>;
              })}
          </WidgetBody>
        </Widget>;
      })}
    </div>;
  }
};
