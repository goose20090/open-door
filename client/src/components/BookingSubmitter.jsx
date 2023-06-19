import React, { useEffect, useState } from "react";

import { useIsFetching, useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { useScheduleQuery } from "../hooks/useScheduleQuery";
import fetchWithError from "../helpers/fetchWithError";
import { AppointmentRadios } from "./AppointmentRadios";
import { handleRadioChange } from "../helpers/handleRadioChange";
import { GreenButton } from "../assets/NewAppointmentStyles";
import { ScheduleQueryError } from "./ScheduleQueryError";

function BookingSubmitter({ therapistSelected, currentTherapistId, selectedDate, nextWorkingDay }) {
  const [formData, setFormData] = useState({
    week_day: nextWorkingDay,
    date: selectedDate,
    start_time: "",
    appointment_type: "recurring",
    therapist_id: currentTherapistId,
  });
  useEffect(() => {
    const newWeekDay = selectedDate.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
    setFormData((prevState) => ({ ...prevState, date: selectedDate, week_day: newWeekDay }));
  }, [selectedDate]);

  useEffect(() => {
    setFormData((prevState) => ({ ...prevState, therapist_id: currentTherapistId }));
  }, [currentTherapistId]);

  function handleSubmit(e) {
    e.preventDefault();
    fetchWithError("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => console.log(r));
  }

  return (
    <ErrorBoundary FallbackComponent={ScheduleQueryError}>
      {therapistSelected ? (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "100%",
          }}
          onSubmit={handleSubmit}
        >
          <AppointmentRadios
            handleSubmit={handleSubmit}
            handleRadioChange={handleRadioChange}
            currentTherapistId={currentTherapistId}
            selectedDate={selectedDate}
            formData={formData}
            setFormData={setFormData}
          >
            <GreenButton>Request Appointment</GreenButton>
          </AppointmentRadios>
        </form>
      ) : (
        <p>Please select a therapist</p>
      )}
    </ErrorBoundary>
  );
}
export default BookingSubmitter;
