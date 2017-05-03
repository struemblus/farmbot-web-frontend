import { Plant, PlantOptions } from "./interfaces";

/** @deprecated
 * Factory function for Plant types. */
export function Plant(options: PlantOptions): Plant {
  let openfarm_slug = options.openfarm_slug || "not-set";
  return {
    id: options.id,
    planted_at: (options.planted_at || ""),
    name: (options.name || "Untitled Plant"),
    x: (options.x || 0),
    y: (options.y || 0),
    radius: (options.radius || 25),
    spread: options.spread,
    openfarm_slug
  };
}
