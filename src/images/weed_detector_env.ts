import { WeedDetectorENV } from "./interfaces";
import { box, Box } from "boxed_value";

export function maybeDeserialize(env: string | undefined): Partial<WeedDetectorENV> {
  var b: Box = box(undefined);
  try {
    b = box(JSON.parse(JSON.stringify(env)));
  } finally {
    return (b.kind === "object") ? b.value : {};
  };
}
