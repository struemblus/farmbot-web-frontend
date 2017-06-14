
export function inferTimezone(current: string | undefined): string {
  if (current) {
    return current;
  }

  if (Intl && Intl.DateTimeFormat) {
    alert("This account did not have a timezone set. " +
      "Farmbot requires a timezone to operate. " +
      "We have updated your timezone settings based on your browser. " +
      "Please verify these settings in the device settings panel. " +
      "DEVICE SYNC IS RECOMMENDED.")
    // WARNING SIDE EFFECTS!!!
    return Intl
      .DateTimeFormat()
      .resolvedOptions()
      .timeZone;
  }

  alert("Warning: Farmbot could not guess your timezone. " +
    "Please select your timezone " +
    "from the dropdown. " +
    "DEVICE SYNC IS RECOMMENDED AFTERWARD.");
  return "UTC";
}
