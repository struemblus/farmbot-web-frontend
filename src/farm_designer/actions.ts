import { MovePlantProps } from "./interfaces";

export function movePlant(payload: MovePlantProps) {
  return { type: "MOVE_PLANT", payload };
};
