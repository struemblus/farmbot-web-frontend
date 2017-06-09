import { BotOriginQuadrant, isBotOriginQuadrant } from "../interfaces";

const SNAP = 10;
const SCALE_FACTOR = 9.8;

export function scale(radius = 0) {
  return (radius * SCALE_FACTOR / 2);
}

/**
 * Used for snapping.
 * Rounds units to nearest 10 (or whatever SNAP is set to).
 */
export function round(num: number) {
  return (Math.round(num / SNAP) * SNAP);
}

export interface ScreenToGardenParams {
  pageX: number;
  pageY: number;
  zoomLvl: number;
}

export function translateScreenToGarden(params: ScreenToGardenParams) {
  let { pageX, pageY, zoomLvl } = params;

  let rawX = Math.round(((pageX) - 320) / zoomLvl);
  let rawY = Math.round(((pageY) - 110) / zoomLvl);

  let output = { x: rawX, y: rawY };
  return output;
}

interface CalculateQuadrantParams {
  value: number;
  quadrant: BotOriginQuadrant;
}

export const FARMBOT_DEFAULT_LENGTH = 3002;
export const FARMBOT_DEFAULT_WIDTH = 1502;

export function calculateXBasedOnQuadrant(params: CalculateQuadrantParams) {
  let { value, quadrant } = params;
  if (isBotOriginQuadrant(quadrant)) {
    switch (quadrant) {
      case 1:
      case 4:
        return FARMBOT_DEFAULT_LENGTH - value;
      case 2:
      case 3:
        return value;
      default:
        throw new Error("Something went wrong calculating the X origin.");
    }
  } else {
    throw new Error("Invalid bot origin quadrant.");
  }
}

export function calculateYBasedOnQuadrant(params: CalculateQuadrantParams) {
  let { value, quadrant } = params;
  if (isBotOriginQuadrant(quadrant)) {
    switch (quadrant) {
      case 3:
      case 4:
        return FARMBOT_DEFAULT_WIDTH - value;
      case 1:
      case 2:
        return value;
      default:
        throw new Error("Something went wrong calculating the Y origin.");
    }
  } else {
    throw new Error("Invalid bot origin quadrant.");
  }
}
