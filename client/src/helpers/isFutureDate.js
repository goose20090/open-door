export function isFutureDate(dateString) {
  const dateToCheck = new Date(dateString);
  const now = new Date();

  return dateToCheck.getTime() > now.getTime();
}
