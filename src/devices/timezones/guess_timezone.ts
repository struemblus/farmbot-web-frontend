
import { warning } from "../../ui/index";

export function inferTimezone(current: string | undefined): string {
  if (current) {
    return current;
  }

  if (Intl && Intl.DateTimeFormat) {
    warning("This account did not have a timezone set. " +
      "Farmbot requires a timezone to operate. " +
      "We have updated your timezone settings based on your browser. " +
      "Please verify these settings in the device settings panel. " +
      "Device sync is recommended.")
    // WARNING SIDE EFFECTS!!!
    return Intl
      .DateTimeFormat()
      .resolvedOptions()
      .timeZone;
  }

  warning("Warning: Farmbot could not guess your timezone. " +
    "Please select your timezone " +
    "from the dropdown. " +
    "Device sync is recommended.");
  return "UTC";
}
