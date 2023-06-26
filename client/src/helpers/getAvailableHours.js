export function getAvailableHours(hours) {
  hours.forEach((hour) => {
    for (let key in hour) {
      if (hour[key] === true) {
        availableHours.push(key);
      }
    }
  });

  return availableHours;
}
