import * as React from "react";
import {
  copy,
  remove
} from "./index";
import { StepTitleBar } from "./step_title_bar";
import { Help, FBSelect, DropDownItem } from "../../ui";
import { t } from "i18next";
import { StepInputBox } from "../inputs/step_input_box";
import { addChan, removeChan, updateMessageType } from "../actions";
import { SendMessage } from "farmbot";
import * as _ from "lodash";
import { StepParams } from "../interfaces";
import { MESSAGE_STATUSES, ChannelChoices } from "./tile_send_message_support";
import { TaggedSequence } from "../../resources/tagged_resources";
import { ResourceIndex } from "../../resources/interfaces";

export function TileSendMessage(props: StepParams) {
  if (props.currentStep.kind === "send_message") {
    return <RefactoredSendMessage
      currentStep={props.currentStep}
      currentSequence={props.currentSequence}
      dispatch={props.dispatch}
      index={props.index}
      resources={props.resources} />;
  } else {
    throw new Error("TileSendMessage expects send_message");
  }
}
interface SendMessageParams {
  currentStep: SendMessage;
  currentSequence: TaggedSequence;
  dispatch: Function;
  index: number;
  resources: ResourceIndex;
}
class RefactoredSendMessage extends React.Component<SendMessageParams, {}> {
  get args() { return this.props.currentStep.args; }
  get message() { return this.args.message };
  get message_type() { return this.args.message_type }
  get initialSelection(): DropDownItem {
    return {
      label: _.capitalize(this.message_type),
      value: this.message_type
    };
  };
  handleOptionChange = (event: DropDownItem) => {
    let { value } = event;
    let action = updateMessageType({ value, index: this.props.index })
    this.props.dispatch(action);
  };

  handleChannelChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let el = e.currentTarget;
    let channel_name = el.id;
    let action = (el.checked) ? addChan : removeChan;
    this.props.dispatch(action({ channel_name, index: this.props.index }));
  };

  render() {
    let { dispatch, index, currentStep, currentSequence } = this.props;

    return <div>
      <div className="step-wrapper">
        <div className="row">
          <div className="col-sm-12">
            <div className="step-header send-message-step">
              <StepTitleBar index={index}
                dispatch={dispatch}
                step={currentStep} />
              <i className="fa fa-arrows-v step-control" />
              <i className="fa fa-clone step-control"
                onClick={() => copy({ dispatch, step: currentStep, sequence: currentSequence })} />
              <i className="fa fa-trash step-control"
                onClick={() => remove({ dispatch, index, sequence: currentSequence })} />
              <Help text={(`The Send Message step instructs
                            FarmBot to send a custom message to the logs.
                            This can help you with debugging your sequences.
                            Eventually you will be able to receive push
                            notifications and email alerts of these
                            messages!`)} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="step-content send-message-step">
              <div className="row">
                <div className="col-xs-12">
                  <label>{t("Message")}</label>
                  <span className="char-limit">
                    {this.message.length}/300
                </span>
                  <StepInputBox dispatch={dispatch}
                    step={currentStep}
                    sequence={currentSequence}
                    index={index}
                    field="message"
                  />
                  <div className="bottom-content">
                    <div className="channel-options">
                      <FBSelect
                        onChange={this.handleOptionChange}
                        initialValue={this.initialSelection}
                        list={MESSAGE_STATUSES}
                        allowEmpty={true}
                      />
                    </div>
                    <div className="channel-fields">
                      <fieldset>
                        <label htmlFor="ticker">
                          Status Ticker/Logs
                      </label>
                        <input type="checkbox"
                          id="ticker"
                          disabled
                          checked
                        />
                      </fieldset>
                      <ChannelChoices
                        currentStep={this.props.currentStep}
                        onChange={this.handleChannelChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}
