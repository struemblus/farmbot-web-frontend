import * as React from "react";
import { Link } from 'react-router';
import { t } from "i18next";

export class Groups extends React.Component<any, any> {
  render() {
    return (
      <div className="panel-container cyan-panel">
        <div className="panel-header cyan-panel">
          <div className="panel-tabs">
            <ul>
              <li className="hidden-sm hidden-md hidden-lg">
                <Link to={"/app/designer?p1=NoTab"}>
                  {t("Designer")}
                </Link>
              </li>
              <li>
                <Link to={"/app/designer?p1=Plants"}>
                  {t("Plants")}
                </Link>
              </li>
              <li>
                <Link to={"/app/designer?p1=Groups"}
                  className={"active"}>{t("Groups")}</Link>
              </li>
              <li>
                <Link to={"/app/designer?p1=Zones"}>
                  {t("Zones")}
                </Link>
              </li>
              <li className="hidden-sm hidden-md hidden-lg">
                <Link to={"/app/designer?p1=Panel2"}>
                  {t("Calendar")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="panel-content">
          <p>Note: Groups are coming soon!</p>
          <i className="fa fa-search"></i>
          <input className="search" placeholder="Search" />
          <div className="search-underline"></div>
          <Link to="/app/designer?p1=AddGroup">
            <div className="plus-button add-group button-like" data-toggle="tooltip" title="Add group">
              <i className="fa fa-2x fa-plus" />
            </div>
          </Link>
        </div>
      </div>
    );
  }
};
