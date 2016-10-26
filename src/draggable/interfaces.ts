import { Step } from "../sequences/interfaces";


/** An entry in the data transfer table. Used to transfer data from a "draggable"
 * to a "dropable". For type safety, this is a "tagged union". See Typescript
 * docs. */
export type DataXfer = StepDataXfer | DataXferBase;

export interface DataXferBase {
    kind: "";
    uuid: string;
    value: any;
}

export interface StepDataXfer {
    kind: "step";
    value: Step;
    uuid: string;
}

/** Interface for store.draggable . */
export interface DragableState {
    dataTransfer: { [key: string]: DataXfer | undefined };
};

/* Props for <DropArea /> */
export interface DropAreaProps {
    callback?: (key: string) => any;
    isLocked?: boolean;
}

/* State for <DropArea /> */
export interface DropAreaState {
    isHovered?: boolean;
}
