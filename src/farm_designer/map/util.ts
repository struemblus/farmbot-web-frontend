import { CropLiveSearchResult } from "../interfaces";

const SNAP = 10;
const SCALE_FACTOR = 9.8;

export function scale(radius = 0) {
  return (radius * SCALE_FACTOR / 2);
}

/** Used for snapping.
 * Rounds units to nearest 10 (or whatever SNAP is set to) */
export function round(num: number) {
  return (Math.round(num / SNAP) * SNAP);
}

interface Params {
  mouseX: number;
  mouseY: number;
  box: ClientRect;
  OFEntry: CropLiveSearchResult;
}

export function translateScreenToGarden(params: Params) {
  let { mouseX, mouseY, box, OFEntry } = params;

  let theDiff = (OFEntry.crop.height && OFEntry.crop.height / 2) || 25;
  let newMouseX = mouseX - theDiff;
  let newMouseY = mouseY - theDiff;

  let rawX = newMouseX - box.left;
  let rawY = newMouseY - box.top;

  return { x: rawX, y: rawY };
}

