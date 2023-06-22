export function formatSingleDate(start_time, date) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const appointmentDate = new Date(date);

  let hours = start_time;
  let minutes = appointmentDate.getUTCMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + "." + minutes + " " + ampm;

  const day = appointmentDate.getUTCDate();
  let daySuffix;
  if (day > 3 && day < 21) daySuffix = "th";
  switch (day % 10) {
    case 1:
      daySuffix = "st";
      break;
    case 2:
      daySuffix = "nd";
      break;
    case 3:
      daySuffix = "rd";
      break;
    default:
      daySuffix = "th";
      break;
  }

  return strTime + ", " + day + daySuffix + " " + months[appointmentDate.getUTCMonth()];
}
