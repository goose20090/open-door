import React, { useState } from "react";
import { Form, Confirmation, Label, Data } from "../../assets/AppointmentCapsuleStyles";
import { getNextAppointmentDate } from "../../helpers/getNextAppointmentDate";
import { integerToWeekday } from "../../helpers/integarToWeekday";
import DatePickerComponent from "../DatePickerComponent";
export default function AppointmentRescheduleForm({ appointment }) {
  const currentDate = getNextAppointmentDate(appointment.week_day);

  const [date, setDate] = useState(currentDate);

  console.log(appointment.week_day);

  return (
    <Form>
      <Confirmation>
        Reschedule this {appointment.recurring ? "recurring" : "single"} appointment?
      </Confirmation>
      <Label as="label">
        Client Name: <Data> {appointment.client.name}</Data>
      </Label>
      <DatePickerComponent therapistSelected={true} startDate={date} setStartDate={setDate} />
      {/* {dateTimeContent} */}
      {/* <SubmitButton>Submit</SubmitButton> */}
    </Form>
  );
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
