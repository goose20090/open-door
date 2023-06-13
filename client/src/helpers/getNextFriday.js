export function getFridayNextWeek() {
  const today = new Date();
  const nextFriday = new Date();

  // Calculate the number of days till the next Friday
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const daysTillNextFriday = (5 - dayOfWeek + 7) % 7; // 5 is Friday in getDay()

  // Set the date for the next Friday of the following week
  nextFriday.setDate(today.getDate() + daysTillNextFriday + 7);

  return nextFriday;
}
