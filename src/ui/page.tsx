import * as React from "react";

interface PageProps {
    children?: JSX.Element | undefined;
}

export function Page(props: PageProps) {
    return <div className="all-content-wrapper">
        {props.children}
    </div>;
}
