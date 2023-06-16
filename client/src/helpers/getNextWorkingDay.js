export function getNextWorkingDay() {
  const date = new Date();
  const currentDay = date.getDay();

  let addDays;

  switch (currentDay) {
    case 5: // Friday
      addDays = 3;
      break;
    case 6: // Saturday
      addDays = 2;
      break;
    default:
      addDays = 1;
  }

  date.setDate(date.getDate() + addDays);
  return date;
}
