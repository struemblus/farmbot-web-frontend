
import { warning } from "../../ui/index";
/** Remove this in October 2017 - RC */
let ONLY_ONCE = {
  need_to_talk: true
}
export function inferTimezone(current: string | undefined): string {
  if (current) {
    return current;
  }

  if (Intl && Intl.DateTimeFormat) {
    if (ONLY_ONCE.need_to_talk) {
      warning("This account did not have a timezone set. " +
        "Farmbot requires a timezone to operate. " +
        "We have updated your timezone settings based on your browser. " +
        "Please verify these settings in the device settings panel. " +
        "Device sync is recommended.");
      ONLY_ONCE.need_to_talk = false;
    }
    // WARNING SIDE EFFECTS!!!
    return Intl
      .DateTimeFormat()
      .resolvedOptions()
      .timeZone;
  }
  if (ONLY_ONCE.need_to_talk) {
    warning("Warning: Farmbot could not guess your timezone. " +
      "Please select your timezone " +
      "from the dropdown. " +
      "Device sync is recommended.");
    ONLY_ONCE.need_to_talk = false;
  };
  return "UTC";
}
