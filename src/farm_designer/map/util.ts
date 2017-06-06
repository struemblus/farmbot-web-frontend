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

  if (zoomLvl < 1) {
    for (zoomLvl; zoomLvl < 1; zoomLvl + 0.1) {
      zoomLvl = Math.max(Math.ceil((zoomLvl += 0.1) * 10) / 10);
      rawX += 20;
      rawY += 10;
    }
  }

  return { x: rawX, y: rawY };
}

