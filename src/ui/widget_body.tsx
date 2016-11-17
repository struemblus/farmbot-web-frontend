import * as React from "react";

interface WidgetBodyProps {
    children?: JSX.Element | undefined;
}

export function WidgetBody(props: WidgetBodyProps) {
    return <div className="col-sm-12">
        <div className="widget-content">
            {props.children}
        </div>
    </div>;
}
