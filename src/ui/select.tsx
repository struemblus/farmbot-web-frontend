import * as React from "react";
import * as ReactSelect from "react-select";

interface SelectProps {
    children?: JSX.Element | undefined;
    onChange?: (e: React.SyntheticEvent<HTMLSelectElement>) => void;
    value?: string;
    id?: string;
    options?: {}[];
    valueComponent?: any;
    optionComponent?: any;
    autoFocus?: boolean;
}

export function Select(props: SelectProps) {
    if (props.options) {
        return <ReactSelect
            onChange={props.onChange}
            value={props.value}
            options={props.options}
            valueComponent={props.valueComponent}
            optionComponent={props.optionComponent} />;
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
