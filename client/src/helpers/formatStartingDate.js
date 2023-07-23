export function formatStartingDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const currentYear = new Date().getFullYear();
  const suffix = getNumberSuffix(day);

  let formattedDate = `${day}${suffix} of ${month}`;
  if (year > currentYear) {
    formattedDate += ` ${year}`;
  }

  return formattedDate;
}

function getNumberSuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  const lastDigit = day % 10;
  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
