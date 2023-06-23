import React from "react";
export default function ConfirmAppointmentForm({ appointment }) {
  return (
    <form>
      <h2>Confirm the following appointment?</h2>
      <p>{appointment.client.name}</p>
    </form>
  );
}
