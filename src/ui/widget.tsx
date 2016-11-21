import * as React from "react";

interface WidgetProps {
    children?: JSX.Element | undefined;
}

export function Widget(props: WidgetProps) {
    return <div className="col-xs-12">
        <div>
            <div className="widget-wrapper">
                <div className="row">
                    <div>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    </div>;
}
