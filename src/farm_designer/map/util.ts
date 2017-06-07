import { BotOriginQuadrant } from "../interfaces";

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

  let rawX = (pageX - 320);
  let rawY = (pageY - 110);

  let diffX = ((rawX / 10) + 10);
  let diffY = (rawY / 10);

  if (zoomLvl < 1) {
    for (zoomLvl; zoomLvl < 1; zoomLvl + 0.1) {
      zoomLvl = Math.max(Math.ceil((zoomLvl += 0.1) * 10) / 10);
      rawX += (diffX * zoomLvl);
      rawY += (diffY * zoomLvl);
    }
  }

  return { x: rawX, y: rawY };
}

interface CalculateQuadrantParams {
  value: number;
  quadrant: BotOriginQuadrant;
}

export function calculateXBasedOnQuadrant(params: CalculateQuadrantParams) {
  let { value, quadrant } = params;
  switch (quadrant) {
    case 1:
      return value;
    case 2:
      return value;
    case 3:
      return value;
    case 4:
      return value;
    default:
      throw new Error("Invalid bot origin x quadrant.");
  }
}

export function calculateYBasedOnQuadrant(params: CalculateQuadrantParams) {
  let { value, quadrant } = params;
  switch (quadrant) {
    case 1:
      return value;
    case 2:
      return value;
    case 3:
      return value;
    case 4:
      return value;
    default:
      throw new Error("Invalid bot origin y quadrant.");
  }
}

