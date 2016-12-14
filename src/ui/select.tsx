import * as React from "react";
import * as ReactSelect from "react-select";
import "react-select/dist/react-select.css";

interface SelectProps {
    children?: JSX.Element | undefined;
    onChange?: (e: React.SyntheticEvent<HTMLSelectElement>) => void;
    value?: string;
    id?: string;
    options?: any[];
}

export function Select(props: SelectProps) {
    if (props.options) {
        return <ReactSelect
            onChange={props.onChange}
            value={props.value}
            options={props.options} />;
    } else {
        return <div className="select-wrapper">
            <select
                id={props.id}
                onChange={props.onChange}
                value={props.value}>
                {props.children}
            </select>
        </div>;
    }
}
