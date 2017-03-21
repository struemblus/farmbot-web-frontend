import { Dictionary } from "farmbot/dist";
import { Regimen, RegimenItem } from "../regimens/interfaces";

const OH_NO = `Something in the application is referencing a resource ID that no
longer exists. Make sure that you are cleaning up resource IDs after deletion
and adding new ones as they are created.`;

export function selectAll<T>(input: never): T[] {
  console.log("THIS IS BROKE NOW!")
  return [];
}
