
export function inferTimezone(current: string | undefined): string {
  if (current) {
    return current;
  }

  if (Intl && Intl.DateTimeFormat) {
    // WARNING SIDE EFFECTS!!!
    return Intl
      .DateTimeFormat()
      .resolvedOptions()
      .timeZone;
  }

  alert("Farmbot could not guess your timezone. Please select your timezone " +
    "from the dropdown.");
  return "UTC";
}
