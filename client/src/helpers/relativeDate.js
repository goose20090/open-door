export function relativeDate(dateString) {
  const now = new Date();
  const dateToCheck = new Date(dateString);
  const isFuture = dateToCheck.getTime() > now.getTime();

  // Delta will be positive for past dates and negative for future ones.
  const delta = Math.round((now - dateToCheck) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;

  let difference = "";

  if (Math.abs(delta) < 30) {
    difference = "just now";
  } else if (Math.abs(delta) < minute) {
    difference = Math.abs(delta) + " seconds";
  } else if (Math.abs(delta) < 2 * minute) {
    difference = "a minute";
  } else if (Math.abs(delta) < hour) {
    difference = Math.floor(Math.abs(delta) / minute) + " minutes";
  } else if (Math.floor(Math.abs(delta) / hour) == 1) {
    difference = "1 hour";
  } else if (Math.abs(delta) < day) {
    difference = Math.floor(Math.abs(delta) / hour) + " hours";
  } else if (Math.abs(delta) < day * 2) {
    difference = "a day";
  } else {
    difference = Math.floor(Math.abs(delta) / day) + " days";
  }

  // Adjusting the string based on whether the date is in the past or future.
  return isFuture ? difference + " from now" : difference + " ago";
}
