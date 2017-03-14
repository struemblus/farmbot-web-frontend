import * as React from "react";
import { ToolSlot, Props, SlotChangeEvent } from "../interfaces";
import {
  Widget,
  WidgetBody,
  WidgetHeader,
  FBSelect,
  Col,
  Row,
  BlurableInput
} from "../../ui";
import {
  toggleEditingToolBays,
  addSlot,
  destroySlot,
  updateSlot,
  saveToolBay
} from "../actions";
import { t } from "i18next";

export class ToolBayForm extends React.Component<Props, Partial<ToolSlot>> {
  constructor() {
    super();
    this.state = { x: 0, y: 0, z: 0 };
  }

  changeExistingSlotValue = (e: SlotChangeEvent) => {
    if (e.currentTarget) {
      let { id, name, value } = e.currentTarget;
      this.props.dispatch(
        updateSlot(parseInt(id), name, parseInt(value as string))
      );
    } else {
      if (e.slot_id && e.value) {
        this.props.dispatch(
          updateSlot(e.slot_id, "tool_id", parseInt(e.value as string))
        );
      } else {
        throw new Error("Error in an existing slot dropdown.");
      }
    }
  }

  setNewSlotValue = (e: SlotChangeEvent) => {
    if (e.currentTarget) {
      this.setState({ [e.currentTarget.name]: e.currentTarget.value });
    } else {
      this.setState({ tool_id: parseInt(e.value as string) });
    }
  }

  addNewSlot = (toolBayId: number) => {
    this.props.dispatch(addSlot(this.state, toolBayId));
    this.setState({ x: 0, y: 0, z: 0, tool_id: undefined });
  }

  render() {
    let { dispatch, toolBays } = this.props;
    let toggle = () => dispatch(toggleEditingToolBays());
    return <div>
      {toolBays.map(bay => {
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
              className="green button-like"
              onClick={() => dispatch(saveToolBay(bay.id, toolBays, toggle))}>
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
                /** Existing tool slots form */
                return <Row key={slot.id}>
                  <Col xs={2}>
                    <label>{index + 1}</label>
                  </Col>
                  <Col xs={2}>
                    <BlurableInput
                      value={(slot.x || 0).toString()}
                      onCommit={this.changeExistingSlotValue}
                      type="number"
                      name="x"
                      id={(slot.id).toString()}
                    />
                  </Col>
                  <Col xs={2}>
                    <BlurableInput
                      value={(slot.y || 0).toString()}
                      onCommit={this.changeExistingSlotValue}
                      type="number"
                      name="y"
                      id={(slot.id).toString()}
                    />
                  </Col>
                  <Col xs={2}>
                    <BlurableInput
                      value={(slot.z || 0).toString()}
                      onCommit={this.changeExistingSlotValue}
                      type="number"
                      name="z"
                      id={(slot.id).toString()}
                    />
                  </Col>
                  <Col xs={3}>
                    <FBSelect
                      list={this.props.getToolOptions(slot.id)}
                      initialValue={this.props.getChosenToolOption(slot.id)}
                      onChange={this.changeExistingSlotValue}
                      allowEmpty={true}
                    />
                  </Col>
                  <Col xs={1}>
                    <button
                      className="red button-like"
                      onClick={() => dispatch(destroySlot(slot.id))}>
                      <i className="fa fa-times" />
                    </button>
                  </Col>
                </Row>;
              })}
            {/** New tool slot form */}
            <Row>
              <Col xs={2}>
                <label>
                  {(this.props.getToolSlots(bay.id).length + 1) || ""}
                </label>
              </Col>
              <Col xs={2}>
                <BlurableInput
                  value={(this.state.x || 0).toString()}
                  onCommit={this.setNewSlotValue}
                  type="number"
                  name="x"
                />
              </Col>
              <Col xs={2}>
                <BlurableInput
                  value={(this.state.y || 0).toString()}
                  onCommit={this.setNewSlotValue}
                  type="number"
                  name="y"
                />
              </Col>
              <Col xs={2}>
                <BlurableInput
                  value={(this.state.z || 0).toString()}
                  onCommit={this.setNewSlotValue}
                  type="number"
                  name="z"
                />
              </Col>
              <Col xs={3}>
                <FBSelect
                  list={this.props.getToolOptions()}
                  onChange={this.setNewSlotValue}
                  allowEmpty={true}
                />
              </Col>
              <Col xs={1}>
                <button
                  className="green button-like"
                  onClick={() => this.addNewSlot(bay.id)}>
                  <i className="fa fa-plus" />
                </button>
              </Col>
            </Row>
          </WidgetBody>
        </Widget>;
      })}
    </div>;
  }
};
