import * as React from "react";

interface RadiusElementProps {
    plots: {}[];
}

export function RadiusElement(props: RadiusElementProps) {
    return <div>
        {props.plots.forEach(plot => {
            // console.log(plot);
        })}
    </div>;
};
