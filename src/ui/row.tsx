import * as React from "react";

interface RowProps {
    children?: any;
}

export function Row(props: RowProps) {
    return <div className="row">
        {props.children}
    </div>;
}
