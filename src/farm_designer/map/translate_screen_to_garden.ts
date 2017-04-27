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
