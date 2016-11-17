import * as React from "react";

interface WidgetProps {
    children?: any;
}

export function Widget(props: WidgetProps) {
    return <div className="col-md-5 col-sm-6 col-xs-12 col-md-offset-1">
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
