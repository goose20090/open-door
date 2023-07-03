import { formatRecurringTime } from "./formatRecurringTime";
import { formatSingleDate } from "./formatSingleDate";
export function formatDetails(appointment) {
  return appointment.recurring
    ? formatRecurringTime(appointment.start_time, appointment.week_day)
    : formatSingleDate(appointment.start_time, appointment.date);
}
