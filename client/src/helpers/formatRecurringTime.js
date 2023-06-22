export function formatRecurringTime(startTime, weekDay) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let hours = startTime;
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strTime = hours + ":00 " + ampm;

  const strDay = days[weekDay];

  return strTime + ", on " + strDay + "s";
}
