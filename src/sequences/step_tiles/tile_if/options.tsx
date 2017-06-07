import * as React from "react";
import { IfParams } from "./index";

const MAGIC_PAIR_NAME = "eager_read_pin";

export function Options(props: IfParams) {
  return <div>
    <div className="col-xs-12 col-md-12">
      <h4>Options</h4>
    </div>
    <div className="col-xs-12 col-md-12">
      <label htmlFor={MAGIC_PAIR_NAME}>
        <input type="checkbox"
          id={MAGIC_PAIR_NAME}
          onChange={() => { console.log("Blah!") }}
          checked={true} />
        Read pin before running this block?
      </label>
    </div>
  </div>
}
