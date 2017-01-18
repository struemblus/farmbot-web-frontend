import * as React from "react";
import * as ReactSelect from "react-select";

interface SelectProps {
    children?: JSX.Element | undefined;
    onChange?: (e: {}) => void;
    value?: string | number;
    id?: string;
    options?: {}[];
    valueComponent?: any;
    optionComponent?: any;
    autoFocus?: boolean;
    placeholder?: string;
    onInputChange?: (inputValue: string) => void;
    className?: string;
}

export function Select(props: SelectProps) {
    if (props.options) {
        return <ReactSelect
            onChange={props.onChange}
            value={props.value}
            options={props.options}
            valueComponent={props.valueComponent}
            optionComponent={props.optionComponent}
            placeholder={props.placeholder}
            onInputChange={props.onInputChange}
            className={props.className}
        />;
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
