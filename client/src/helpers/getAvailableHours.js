export function getAvailableHours(schedule, weekDayInt) {
  const weekDayArr = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  let availableHours = [];
  let hours = schedule[weekDayArr[weekDayInt]];

  hours.forEach((hour) => {
    for (let key in hour) {
      if (hour[key] === true) {
        availableHours.push(key);
      }
    }
  });

  return availableHours;
}
