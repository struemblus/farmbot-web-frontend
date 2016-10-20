import * as React from "react";
import { defensiveClone } from "../util";

export interface SaucerProps {
  color?: string;
  border?: string;
  style?: { [k: string]: string };
};

export /** A colored UI disc/circle. */
  function Saucer({ color, border, style }: SaucerProps) {
  style = defensiveClone<{ [k: string]: string }>(style || {});
  _.assign(style, { transition: "all 0.2s ease" });
  if (border) { (style || {})["border"] = `3px solid ${border}`; }
  let className = `saucer saucer-${color}`;
  return <div className={className} style={style} />;
}
