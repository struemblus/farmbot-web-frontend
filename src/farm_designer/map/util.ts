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

export function translateScreenToGarden(mouseX: number,
  mouseY: number,
  boxX: number,
  boxY: number) {
  /** The offset of 50px is made for the setDragImage to make it in the
   * center of the mouse for accuracy which is why this is being done.
   * Once we get more dynamic with the values (different size plants),
   * we can tweak this accordingly.
   */
  let newMouseX = mouseX - 25;
  let newMouseY = mouseY - 25;
  /* */

  let rawX = newMouseX - boxX;
  let rawY = newMouseY - boxY;

  return { x: rawX, y: rawY };
}

