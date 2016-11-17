import * as React from "react";
import { t } from "i18next";

interface ButtonProps {
    /** Default styles + whatever user wants */
    className?: string;
    /** Text inside Button */
    children?: any;
    /** Boolean passed to determine ui */
    hideIf?: boolean;
    /** Callback */
    cb?: () => void;
}

export function Button(props: ButtonProps) {
    let baseClasses = "";
    let shouldHide = props.hideIf ? "hide" : "";
    let finalClasses = `${baseClasses} ${props.className} ${shouldHide}`;
    let callback = props.cb ? props.cb : () => {
        console.warn("Callback not passed to Button component.");
    };

    return <button
        className={finalClasses}
        onClick={callback}>
        {t(props.children)}
    </button>;
}
