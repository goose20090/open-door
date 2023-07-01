export function renderRescheduleTitle(user, appointment, requestRecipient) {
  if (appointment.status === "confirmed") {
    return `Reschedule this ${
      appointment.recurring ? "recurring" : "single"
    } appointment with ${requestRecipient}?`;
  } else if (appointment.status === "pending") {
    if (!!appointment.rescheduled_by) {
      return `Change your reschedule request with ${requestRecipient}?`;
    }
    return `Change your booking request with ${requestRecipient}?`;
  } else if (appointment.status === "rejected") {
    return `Try another time and date with ${requestRecipient}?`;
  }
}
