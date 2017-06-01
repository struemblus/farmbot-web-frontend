export function selectImage(uuid: string) {
  return { type: "SELECT_IMAGE", payload: uuid };
}
