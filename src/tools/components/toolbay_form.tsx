import * as React from "react";
import { ListAndFormProps, ToolBayFormState } from "../interfaces";
import { Widget, WidgetBody, WidgetHeader, FBSelect } from "../../ui";
import { Col, Row, BlurableInput } from "../../ui";
import { toggleEditingToolBays, saveToolBay } from "../actions";
import { mapStateToPropsToolBay, ToolBayFormProps } from "./map_state_to_props_toolbay";
import { t } from "i18next";
import { connect } from "react-redux";

@connect(mapStateToPropsToolBay)
export class ToolBayForm extends React.Component<ToolBayFormProps,
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

  componentDidMount() {
    this.setState({
      tool_bays: this.props.tool_bays,
      tool_slots: this.props.tool_slots,
      tools: this.props.tools
    });
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

  //   removeTool = (e: React.FormEvent<HTMLButtonElement>) => {
  //   if (this.state.tools) {
  //     let toolStateCopy = this.state.tools.slice(0);
  //     let index = e.currentTarget.id || "NO ID FOUND";
  //     let modifiedTool = toolStateCopy[parseInt(index)];
  //     modifiedTool.isNew = false;
  //     modifiedTool.isDeleted = true;
  //     this.setState({ tools: toolStateCopy });
  //   }
  // }

  addToolSlot(tool_bay_id: number) {
    if (this.state.tool_slots) {
      let newToolSlotList = this.state.tool_slots.concat({
        x: this.state.new_slot_x,
        y: this.state.new_slot_y,
        z: this.state.new_slot_z,
        tool_id: this.state.new_slot_tool_id,
        tool_bay_id
      });
      this.setState({ tool_slots: newToolSlotList });
      this.resetState();
    }
  }

  saveAll = () => {
    // TODO: This is NOT scalable. Temp solution for just having one toolbay.
    if (this.state.tool_bays && this.state.tool_bays[0]) {
      let tool_bay_id = this.state.tool_bays[0].id;
      this.props.dispatch(saveToolBay(tool_bay_id, this.state.tool_bays));
    }
  }

  renderSlots = (tool_bay_id: number) => {
    return _.sortBy((this.state.tool_slots || []), "id").map((slot, index) => {
      let { x, y, z, tool_id } = slot;

      let toolOptions = (this.state.tools || []).map(tool => {
        return { label: tool.name, value: tool.id };
      });

      return <div key={index}>
        <Row>
          <Col xs={1}>
            <label>{index}</label>
          </Col>
          <Col xs={2}>
            <BlurableInput
              value={(x || 0).toString()}
              type="number"
              name="x"
              onCommit={this.set}
            />
          </Col>
          <Col xs={2}>
            <BlurableInput
              value={(y || 0).toString()}
              type="number"
              name="y"
              onCommit={this.set}
            />
          </Col>
          <Col xs={2}>
            <BlurableInput
              value={(z || 0).toString()}
              type="number"
              name="z"
              onCommit={this.set}
            />
          </Col>
          <Col xs={4}>
            <FBSelect
              dropDownItems={toolOptions}
              value={tool_id}
            />
          </Col>
          <Col xs={1}>
            <button
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
    let {
      new_slot_x,
      new_slot_y,
      new_slot_z,
      tool_bays,
      tool_slots
    } = this.state;

    let toolOptions = (this.state.tools || []).map(tool => {
      return { label: tool.name, value: tool.id };
    });
    console.log(this.state);
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
                <FBSelect dropDownItems={toolOptions} />
              </Col>
              <Col xs={1}>
                <button
                  className="button-like green"
                  onClick={() => this.addToolSlot(tool_bay.id)}>
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
