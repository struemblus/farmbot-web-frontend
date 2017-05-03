import { AuthState } from "./auth/interfaces";
import { ConfigState } from "./config/interfaces";
import { BotState } from "./devices/interfaces";
import { Color as FarmBotJsColor } from "farmbot";
import { DragableState } from "./draggable/interfaces";
import { PeripheralState } from "./controls/peripherals/interfaces";
import { RestResources } from "./resources/interfaces";

/** Regimens and sequences may have a "color" which determines how it looks
    in the UI. Only certain colors are valid. */
export type Color = FarmBotJsColor;

export interface SelectOptionsParams {
  label: string;
  value: string | number | undefined;
  disabled?: boolean;
  field?: string;
  type?: string;
  x?: number;
  y?: number;
  z?: number;
}

export interface Log {
  id?: number | undefined;
  message: string;
  meta: { type: string[]; };
  channels: string[];
  created_at: number;
}

interface Location {
  /** EX: /app/designer */
  pathname: string;
  /** EX: ?id=twowing-silverbell&p1=SpeciesInfo */
  search: string;
  hash: string;
  // /** ¯\_(ツ)_/¯ */
  // state: void;
  /** EX: "PUSH" */
  action: string;
  /** EX:  jhedoi */
  key: string;
  /** URL ?Query=string, converted to JS object. */
  query: { [name: string]: string };
}

export interface Everything {
  config: ConfigState;
  auth: AuthState | undefined;
  dispatch: Function;
  bot: BotState;
  location: Location;
  draggable: DragableState;
  peripherals: PeripheralState;
  resources: RestResources;
  router: {
    push(url?: string): void;
  };
}

/** React-select does not provide an interface for their CustomOption
 * component. Since they share similarities, we can go with this one as a base.
 */
export interface CustomOptionProps {
  onSelect: Function;
  onFocus: Function;
  isFocused: Function;
  option: {
    // I will have to refactor this. On the TODO list. -CV
    value?: string;
    x?: number;
    y?: number;
    z?: number;
  };
  className: string;
  children: JSX.Element;
}

/** There were a few cases where we handle errors that are legitimately unknown.
 *  In those cases, we can use the `UnsafeError` type instead of `any`, just to
 *  quiet down the linter and to let others know it is inherently unsafe.
 */
export type UnsafeError = any;
