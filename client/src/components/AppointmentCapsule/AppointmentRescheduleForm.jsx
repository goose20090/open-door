import React, { useState } from "react";
import RecurringReschedule from "./RecurringReschedule";
export default function AppointmentRescheduleForm({ appointment }) {
  if (appointment.recurring) return <RecurringReschedule appointment={appointment} />;
  if (!appointment.recurring) return <SingleReschedule appointment={appointment} />;
}

// let dateTimeContent;

// if (appointment.recurring) {
//   dateTimeContent = (
//     <>
//       <Label as="label">
//         Time: <Data>{appointment.start_time}:00</Data>
//       </Label>
//       <Label>
//         Weekday: <Data>{integerToWeekday(appointment.week_day)}</Data>
//       </Label>
//     </>
//   );
// } else {
//   dateTimeContent = (
//     <>
//       <Label as="label">
//         Time: <Data>{appointment.start_time}:00</Data>
//       </Label>
//       <Label as="label">
//         Date: <Data>{new Date(appointment.date).toLocaleDateString()}</Data>
//       </Label>
//     </>
//   );
// }

//   function handleSubmit(e) {
//     e.preventDefault();
//     fetchWithError(`api/appointments/${appointment.id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ status: `${action.toLowerCase()}ed` }),
//     }).then(() => queryClient.invalidateQueries(["user"]));
//   }
