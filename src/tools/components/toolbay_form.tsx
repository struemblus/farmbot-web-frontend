import * as React from "react";
import { ListAndFormProps, ToolBayFormState } from "../interfaces";
import { Widget, WidgetBody, WidgetHeader, FBSelect } from "../../ui";
import { Col, Row, BlurableInput, DropDownItem } from "../../ui";
import { Everything } from "../../interfaces";
import {
  toggleEditingToolBays,
  saveToolBay,
  destroySlot,
  addToolSlot,
  updateToolSlot,
  saveToolSlots
} from "../actions";
import { t } from "i18next";
import { connect } from "react-redux";

// Feeling like this is unnecessary...
interface FBSelectWithSlotId extends DropDownItem {
  slot_id: number;
  value: number;
}

@connect((state: Everything) => state)
export class ToolBayForm extends React.Component<ListAndFormProps,
Partial<ToolBayFormState>> {
  constructor() {
    super();
    this.state = {
      new_slot_x: 0,
      new_slot_y: 0,
      new_slot_z: 0,
      new_slot_tool_id: null
    };
  }

  resetState = () => {
    this.setState({
      new_slot_x: 0,
      new_slot_y: 0,
      new_slot_z: 0,
      new_slot_tool_id: null
    });
  }

  set = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let { name, value } = e.currentTarget;
    this.setState({ [name]: parseInt(value) });
  }

  destroy = (id: number | null) => {
    if (id === null) {
      throw new Error("Could not find tool slot ID.");
    } else {
      this.props.dispatch(destroySlot(id));
    }
  }

  add = (tool_bay_id: number) => {
    let slot = {
      x: this.state.new_slot_x,
      y: this.state.new_slot_y,
      z: this.state.new_slot_z,
      tool_id: this.state.new_slot_tool_id,
      tool_bay_id
    };
    this.props.dispatch(addToolSlot(slot));
    this.resetState();
  }

  update = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let { id, name, value } = e.currentTarget;
    this.props.dispatch(updateToolSlot(parseInt(id), name, parseInt(value)));
  }

  updateTool = (item: FBSelectWithSlotId) => {
    // Key is not assignable error? The interface above makes it work?
    this.props.dispatch(updateToolSlot(item.slot_id, "tool_id", item.value));
  }

  updateNewSlotTool = (item: DropDownItem) => {
    // Key is not assignable error?
    // this.setState({ new_slot_tool_id: item.value });
  }

  saveAll = () => {
    this.props.dispatch(saveToolSlots(this.props.all.tool_slots));
    // TODO: This is NOT scalable. Temp solution for just having one toolbay.
    if (this.props.all.tool_bays && this.props.all.tool_bays[0]) {
      let tool_bay_id = this.props.all.tool_bays[0].id;
      this.props.dispatch(saveToolBay(tool_bay_id, this.props.all.tool_bays));
    }
  }

  renderSlots = (tool_bay_id: number) => {
    return _.sortBy((this.props.all.tool_slots || []), "id").map((slot, index) => {
      let { x, y, z, tool_id, id } = slot;

      let toolOptions = (this.props.all.tools.all || []).map(tool => {
        return { label: tool.name, value: tool.id, slot_id: id };
      });

      return <div key={index}>
        <Row>
          <Col xs={1}>
            <label>{index}</label>
          </Col>
          <Col xs={2}>
            <BlurableInput
              id={(id || "Error getting slot ID.").toString()}
              value={(x || 0).toString()}
              type="number"
              name="x"
              onCommit={this.update}
            />
          </Col>
          <Col xs={2}>
            <BlurableInput
              id={(id || "Error getting slot ID.").toString()}
              value={(y || 0).toString()}
              type="number"
              name="y"
              onCommit={this.update}
            />
          </Col>
          <Col xs={2}>
            <BlurableInput
              id={(id || "Error getting slot ID.").toString()}
              value={(z || 0).toString()}
              type="number"
              name="z"
              onCommit={this.update}
            />
          </Col>
          <Col xs={4}>
            <FBSelect
              onChange={this.updateTool}
              dropDownItems={toolOptions}
              value={tool_id}
            />
          </Col>
          <Col xs={1}>
            <button
              onClick={() => this.destroy(slot.id || null)}
              className="button-like red">
              <i className="fa fa-times"></i>
            </button>
          </Col>
        </Row>
      </div>;
    });
  }

  render() {
    let toggleEdit = () => { this.props.dispatch(toggleEditingToolBays()); };
    let { new_slot_x, new_slot_y, new_slot_z } = this.state;
    let { tool_bays, tool_slots } = this.props.all;

    let newSlotToolOptions = (this.props.all.tools.all || []).map(tool => {
      return { label: tool.name, value: tool.id };
    });

    return <Widget className="toolbay-form-widget">
      <WidgetHeader
        helpText={t(`Toolbays are where you store your FarmBot Tools. Each 
          Toolbay has Slots that you can put your Tools in, which should be 
          reflective of your real FarmBot hardware configuration.`)}

        /** Make [0] index dynamic once we support multiple bays */
        title={tool_bays && tool_bays[0] && tool_bays[0].name || "Name not found"}>
        <button
          className="green button-like"
          onClick={this.saveAll}>
          {t("SAVE")}
        </button>
        <button
          className="gray button-like"
          onClick={toggleEdit}>
          {t("BACK")}
        </button>
      </WidgetHeader>

      {(tool_bays || []).map((tool_bay, index) => {

        return <div key={index}>
          <WidgetBody>
            <Row>
              <Col xs={3}>
                <label>{t("TOOLBAY NAME")}</label>
              </Col>
              <Col xs={9}>
                <BlurableInput
                  value={tool_bay.name}
                  onCommit={() => console.log("update toolbay name")}
                  id={index.toString()}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={1}>
                <label>{t("SLOT")}</label>
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
                <label>{t("TOOL")}</label>
              </Col>
            </Row>

            {this.renderSlots(tool_bay.id)}

            <Row>
              <Col xs={1}>
                <label>
                  {tool_slots && tool_slots.length || 0}
                </label>
              </Col>
              <Col xs={2}>
                <BlurableInput
                  value={(new_slot_x || 0).toString()}
                  type="number"
                  name="new_slot_x"
                  onCommit={this.set}
                />
              </Col>
              <Col xs={2}>
                <BlurableInput
                  value={(new_slot_y || 0).toString()}
                  type="number"
                  name="new_slot_y"
                  onCommit={this.set}
                />
              </Col>
              <Col xs={2}>
                <BlurableInput
                  value={(new_slot_z || 0).toString()}
                  type="number"
                  name="new_slot_z"
                  onCommit={this.set}
                />
              </Col>
              <Col xs={4}>
                <FBSelect
                  onChange={this.updateNewSlotTool}
                  dropDownItems={newSlotToolOptions} />
              </Col>
              <Col xs={1}>
                <button
                  className="button-like green"
                  onClick={() => this.add(tool_bay.id)}>
                  <i className="fa fa-plus"></i>
                </button>
              </Col>
            </Row>
          </WidgetBody>
        </div>;
      })}
    </Widget>;
  }
};
