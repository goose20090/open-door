export function getNextWeekdayDate(weekdayIndex) {
  if (weekdayIndex < 0 || weekdayIndex > 6) {
    throw new Error("Invalid weekday index. Please provide a valid integer value (0-6).");
  }

  const today = new Date();
  let nextDate = new Date(today);
  const currentDayOfWeek = today.getDay();

  // Calculate the days until the next occurrence of the target weekday
  let daysUntilNextWeekday = (7 + weekdayIndex - currentDayOfWeek) % 7;

  // If the target weekday is today or in the past, move to the next week
  if (daysUntilNextWeekday === 0) {
    daysUntilNextWeekday = 7;
  }

  nextDate.setDate(today.getDate() + daysUntilNextWeekday);

  const formattedDate = nextDate.toISOString().split("T")[0];
  return formattedDate;
}
