import * as React from "react";
import { Row, Col, Widget, WidgetBody, WidgetHeader } from "../../ui";
import { t } from "i18next";
import { ToolBayListProps } from "../interfaces";
import { TaggedToolSlot } from "../../resources/tagged_resources";
import { ToolBayHeader } from "./toolbay_header";

export class ToolBayList extends React.Component<ToolBayListProps, {}> {
  render() {
    let toggle = () => this.props.toggle();
    let { getToolSlots, getToolByToolSlotUUID } = this.props;

    return <div>
      {this.props.toolBays.map(bay => {
        return <Widget key={bay.body.id}>
          <WidgetHeader
            helpText={t(`Toolbays are where you store your FarmBot Tools. Each
              Toolbay has Slots that you can put your Tools in, which should be
              reflective of your real FarmBot hardware configuration.`)}
            title={"ToolBay 1"}>
            <button
              className="gray" onClick={toggle}>
              {t("Edit")}
            </button>
          </WidgetHeader>
          <WidgetBody>
            <ToolBayHeader />
            {getToolSlots().map(
              (slot: TaggedToolSlot, index: number) => {
                let tool = getToolByToolSlotUUID(slot.uuid);
                let name = (tool && tool.body.name) || "None";
                return <Row key={slot.body.id}>
                  <Col xs={2}>
                    <label>{index + 1}</label>
                  </Col>
                  <Col xs={2}>{slot.body.x}</Col>
                  <Col xs={2}>{slot.body.y}</Col>
                  <Col xs={2}>{slot.body.z}</Col>
                  <Col xs={4}>
                    {name}
                  </Col>
                </Row>;
              })}
          </WidgetBody>
        </Widget>;
      })}
    </div>;
  }
};
