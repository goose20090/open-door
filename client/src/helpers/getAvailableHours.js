export function getAvailableHours(schedule, weekDay) {
  let availableHours = [];
  let hours = schedule[weekDay];

  hours.forEach((hour) => {
    for (let key in hour) {
      if (hour[key] === true) {
        availableHours.push(key);
      }
    }
  });

  return availableHours;
}
