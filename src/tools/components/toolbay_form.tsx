import * as React from "react";
import { ListAndFormProps, ToolBayFormState } from "../interfaces";
import { Widget, WidgetBody, WidgetHeader, FBSelect } from "../../ui";
import { Col, Row, BlurableInput } from "../../ui";
import { toggleEditingToolBays, saveToolBay, addToolSlot } from "../actions";
import { t } from "i18next";

export class ToolBayForm extends React.Component<ListAndFormProps,
  Partial<ToolBayFormState>> {
  constructor() {
    super();
    this.state = {
      tool_slots: [],
      tool_bays: [],
      new_slot_x: "0",
      new_slot_y: "0",
      new_slot_z: "0",
      new_slot_tool_id: null,
    };
  }

  componentDidMount() {
    // [0] index until we allow more toolbays to be made
    this.setState({
      tool_bays: this.props.all.tool_bays,
      tool_slots: this.props.all.tool_slots
    });
  }

  resetState = () => {
    this.setState({
      new_slot_x: "0",
      new_slot_y: "0",
      new_slot_z: "0",
      new_slot_tool_id: null
    });
  }

  set = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let { name, value } = e.currentTarget;
    this.setState({ [name]: parseInt(value) });
  }

  updateToolBayName = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (this.state.tool_bays) {
      let toolBayStateCopy = this.state.tool_bays.slice(0);
      let index = e.currentTarget.id || "NO ID FOUND";
      let modifiedBay = toolBayStateCopy[parseInt(index)];
      modifiedBay.name = e.currentTarget.value;
      modifiedBay.dirty = true;
      this.setState({ tool_bays: toolBayStateCopy });
    }
  }

  saveAll = (tool_bay_id: number) => {
    // this.props.dispatch(saveToolBay(tool_bay_id, tool_bays));
  }

  renderSlots = (tool_bay_id: number) => {
    return _.sortBy((this.state.tool_slots || []), "id").map((slot, index) => {
      index++;
      let { x, y, z, tool_id } = slot;

      return <Row>
        <Col xs={1}>
          <label>{index}</label>
        </Col>
        <Col xs={2}>
          <BlurableInput
            value={(x || "0").toString()}
            type="number"
            name="x"
            onCommit={this.set}
          />
        </Col>
        <Col xs={2}>
          <BlurableInput
            value={(y || "0").toString()}
            type="number"
            name="y"
            onCommit={this.set}
          />
        </Col>
        <Col xs={2}>
          <BlurableInput
            value={(z || "0").toString()}
            type="number"
            name="z"
            onCommit={this.set}
          />
        </Col>
        <Col xs={4}>
          <FBSelect dropDownItems={[]} />
        </Col>
        <Col xs={1}>
          <button
            className="button-like red">
            <i className="fa fa-times"></i>
          </button>
        </Col>
      </Row>;
    });
  }

  render() {
    let toggleEdit = () => { this.props.dispatch(toggleEditingToolBays()); };
    let {
      new_slot_x,
      new_slot_y,
      new_slot_z,
      tool_bays,
      tool_slots
    } = this.state;

    return <Col md={8}>
      <Widget>
        <WidgetHeader
          helpText={t(`Toolbays are where you store your FarmBot Tools. Each 
          Toolbay has Slots that you can put your Tools in, which should be 
          reflective of your real FarmBot hardware configuration.`)}
          title={"Tool Bays"}>
          <button
            className="green button-like"
            onClick={this.props.dispatch(addToolSlot)}>
            {t("SAVE")}
          </button>
          <button
            className="gray button-like"
            onClick={toggleEdit}>
            {t("BACK")}
          </button>
        </WidgetHeader>

        {(tool_bays || []).map((tool_bay, index) => {
          return <WidgetBody>
            <Row>
              <Col xs={3}>
                <label>{t("TOOLBAY NAME")}</label>
              </Col>
              <Col xs={9}>
                <BlurableInput
                  value={name}
                  onCommit={this.updateToolBayName}
                  id={("").toString()}
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
                  {tool_slots && tool_slots.length + 1 || 0}
                </label>
              </Col>
              <Col xs={2}>
                <BlurableInput
                  value={(new_slot_x || "0")}
                  type="number"
                  name="x"
                  onCommit={this.set}
                />
              </Col>
              <Col xs={2}>
                <BlurableInput
                  value={(new_slot_y || "0")}
                  type="number"
                  name="y"
                  onCommit={this.set}
                />
              </Col>
              <Col xs={2}>
                <BlurableInput
                  value={(new_slot_z || "0")}
                  type="number"
                  name="z"
                  onCommit={this.set}
                />
              </Col>
              <Col xs={4}>
                <FBSelect dropDownItems={[]} />
              </Col>
              <Col xs={1}>
                <button
                  className="button-like green">
                  <i className="fa fa-plus"></i>
                </button>
              </Col>
            </Row>
          </WidgetBody>;
        })}

      </Widget>
    </Col>;
  }
};
