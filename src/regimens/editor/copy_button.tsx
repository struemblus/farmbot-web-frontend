import * as React from "react";
import { Regimen } from "../interfaces";
import { copyRegimen } from "../actions";

interface CopyButtnProps {
    dispatch: Function;
    regimen?: Regimen;
}

export function CopyButton({dispatch, regimen}: CopyButtnProps) {
    if (regimen) {
        return <div>
            <button className="yellow button-like widget-control"
                onClick={() => dispatch(copyRegimen(regimen))}>
                Copy
          </button>
        </div>;
    } else {
        return <span />;
    };
}
