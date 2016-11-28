import * as React from "react";

interface ColumnProps {
    children?: JSX.Element | undefined;
}

export function Col(props: ColumnProps) {
    return <div className="col-md-6 col-lg-6 col-sm-6">
        {props.children}
    </div>;
}
