export function getNextAppointmentDate(weekday) {
  let date = new Date();
  let diff = weekday - date.getDay();

  if (diff <= 0) {
    diff += 7;
  }

  date.setDate(date.getDate() + diff);
  date.setUTCHours(12);
  return date;
}
