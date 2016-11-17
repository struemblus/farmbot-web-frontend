import * as React from "react";

interface PageProps {
    children?: any;
}

export function Page(props: PageProps) {
    return <div className="all-content-wrapper">
        {props.children}
    </div>;
}
