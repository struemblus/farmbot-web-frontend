import * as React from "react";
import * as _ from "lodash";

interface Props {
  param: string;
}

export function MobileRegimensNav(props: Props) {
  return <div className="mobile-only regimens-mobile-nav col-md-3 col-sm-12">
    <div className="widget-wrapper">
      <div className="widget-header">
        <a href="javascript:history.back()" className="back-arrow">
          <i className="fa fa-arrow-left"></i>&nbsp;&nbsp;
          {_.capitalize(props.param.toString()) || "Name not found"}
        </a>
      </div>
    </div>
  </div>;
}
