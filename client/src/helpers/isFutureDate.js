export function isFutureDate(start_time, date) {
  const currentTime = new Date();
  const appointmentTime = new Date(date);
  appointmentTime.setHours(start_time, 0, 0, 0);
  return appointmentTime > currentTime;
}
