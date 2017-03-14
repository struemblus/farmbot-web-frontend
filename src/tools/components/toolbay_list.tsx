import * as React from "react";
import { Row, Col, Widget, WidgetBody, WidgetHeader } from "../../ui";
import { toggleEditingToolBays } from "../actions";
import { t } from "i18next";
import { ToolSlot, Tool, Props } from "../interfaces";

export class ToolBayList extends React.Component<Props, {}> {
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
              {t("Edit")}
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
              <Col xs={4}>
                <label>{t("Tool")}</label>
              </Col>
            </Row>
            {this.props.getToolSlots(bay.id).map(
              (slot: ToolSlot, index: number) => {
                return <Row key={slot.id}>
                  <Col xs={2}>
                    <label>{index + 1}</label>
                  </Col>
                  <Col xs={2}>{slot.x}</Col>
                  <Col xs={2}>{slot.y}</Col>
                  <Col xs={2}>{slot.z}</Col>
                  <Col xs={4}>
                    {/* TODO: Get rid of typecast */}
                    {(this.props.getChosenTool(slot.id) as Tool).name || ""}
                  </Col>
                </Row>;
              })}
          </WidgetBody>
        </Widget>;
      })}
    </div>;
  }
};
