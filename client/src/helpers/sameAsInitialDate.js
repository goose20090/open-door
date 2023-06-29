export function sameAsInitialDate(formData, appointment) {
  const { recurring } = appointment;

  if (recurring) {
    return (
      appointment.start_time == formData.start_time && appointment.week_day == formData.week_day
    );
  } else {
    const formDataDate = new Date(formData.date).toISOString();
    const appointmentDate = new Date(appointment.date).toISOString();

    return appointment.start_time == formData.start_time && appointmentDate == formDataDate;
  }
}
