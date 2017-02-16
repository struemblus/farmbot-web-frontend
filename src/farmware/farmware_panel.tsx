import * as React from "react";
import { t } from "i18next";

interface FWState {
}

interface FWProps {
}

export class Farmware extends React.Component<FWProps, FWState> {
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum aspernatur odio sint est laudantium! Doloribus ad recusandae quam, culpa neque veniam esse inventore, atque tempora mollitia provident at sed. Minus.
          </div>
        </div>
      </div>
    </div>;
  }
}
