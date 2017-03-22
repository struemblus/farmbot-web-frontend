import * as React from "react";
import { ToolBayFormProps } from "../interfaces";
import {
  Widget,
  WidgetBody,
  WidgetHeader,
  FBSelect,
  Col,
  Row,
  BlurableInput
} from "../../ui";
import { t } from "i18next";
import { TaggedToolSlot } from "../../resources/tagged_resources";
import { edit, destroy } from "../../api/crud";

export class ToolBayForm extends React.Component<ToolBayFormProps, {}> {
  render() {
    let toggle = () => this.props.toggle();
    let { dispatch } = this.props;
    return <div>
      {this.props.toolBays.map(bay => {
        return <Widget key={bay.body.id}>
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
              className="green button-like"
              onClick={() => { /** save */ }}>
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
            {this.props.getToolSlots().map(
              (slot: TaggedToolSlot, index: number) => {
                return <Row key={slot.body.id}>
                  <Col xs={2}>
                    <label>{index + 1}</label>
                  </Col>
                  <Col xs={2}>
                    <BlurableInput
                      value={(slot.body.x || 0).toString()}
                      onCommit={(e) => {
                        dispatch(edit(slot, { x: e.currentTarget.value }));
                      }}
                      type="number"
                    />
                  </Col>
                  <Col xs={2}>
                    <BlurableInput
                      value={(slot.body.y || 0).toString()}
                      onCommit={(e) => {
                        dispatch(edit(slot, { y: e.currentTarget.value }));
                      }}
                      type="number"
                      name="y"
                    />
                  </Col>
                  <Col xs={2}>
                    <BlurableInput
                      value={(slot.body.z || 0).toString()}
                      onCommit={(e) => {
                        dispatch(edit(slot, { z: e.currentTarget.value }));
                      }}
                      type="number"
                    />
                  </Col>
                  <Col xs={3}>
                    <FBSelect
                      list={this.props.getToolOptions()}
                      initialValue={this.props.getChosenToolOption(slot.uuid)}
                      onChange={(e) => {
                        dispatch(edit(slot, { x: e.value }));
                      }}
                      allowEmpty={true}
                    />
                  </Col>
                  <Col xs={1}>
                    <button
                      className="red button-like"
                      onClick={() => dispatch(destroy(slot.uuid))}>
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
