import * as React from "react";
import { t } from "i18next";
import { FBSelect } from "../ui";
import { BotState } from "../devices/interfaces";
import { devices } from "../device";


interface FWState {
  selectedFarmware: string | undefined;
}

interface FWProps {
  bot: BotState;
}

export class Farmware extends React.Component<FWProps, Partial<FWState>> {
  update = () => {
    devices
      .current;
  }
  fwList = () => {
    let { farmwares } = this.props.bot.hardware.process_info;
    let choices = farmwares.map((x, i) => ({ value: i, label: x.name }));
    choices.push({ value: -9, label: "bar" });
    return choices;
  }

  render() {
    return <div className="col-sm-12">
      <div className="row">
        <div className="col-sm-12">
          <div className="widget-header">
            <h5>Farmware</h5>
            <i className="fa fa-question-circle widget-help-icon">
              <div className="widget-help-text">
                {t(`This widget shows Farmware (plugin) information.`)}
              </div>
            </i>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="widget-content">
            <div className="row">
              <div className="col-sm-12">
                <div className="row">
                  <div className="col-sm-10">
                    <input type="url" placeholder={"http://...."} />
                  </div>
                  <div className="col-sm-2">
                    <button className="button-like green">Install</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-9">
                <FBSelect dropDownItems={this.fwList()}
                  onChange={(x) => this.setState({ selectedFarmware: x.label })}
                  placeholder="Installed Farmware Packages" />
              </div>
              <div className="col-sm-3">
                <button className="button-like green">Update</button>
                <button className="button-like red">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}
