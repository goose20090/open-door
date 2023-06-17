import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GreenButton } from "../assets/NewAppointmentStyles";
import { useScheduleQuery } from "../hooks/useScheduleQuery";
import { handleRadioChange } from "../helpers/handleRadioChange";
import { getAvailableHours } from "../helpers/getAvailableHours";
import fetchWithError from "../helpers/fetchWithError";
function BookingSubmitter({ therapistSelected, currentTherapistId, selectedDate, nextWorkingDay }) {
  const {
    isLoading,
    isSuccess,
    data: schedule,
  } = useScheduleQuery(currentTherapistId, selectedDate);

  const [formData, setFormData] = useState({
    week_day: nextWorkingDay,
    date: selectedDate,
    start_time: "",
    appointment_type: "recurring",
    therapist_id: currentTherapistId,
  });

  useEffect(() => {
    console.log(selectedDate);
    const newWeekDay = selectedDate.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
    setFormData((prevState) => ({ ...prevState, date: selectedDate, week_day: newWeekDay }));
  }, [selectedDate]);

  useEffect(() => {
    setFormData((prevState) => ({ ...prevState, therapist_id: currentTherapistId }));
  }, [currentTherapistId]);

  let availableHours;

  if (isSuccess) {
    availableHours = getAvailableHours(schedule, formData.week_day);
  }

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

  return therapistSelected ? (
    isLoading ? (
      <p>Loading</p>
    ) : (
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          height: "100%",
        }}
        onSubmit={handleSubmit}
      >
        <fieldset>
          <legend>Select a time for your appointment:</legend>
          {availableHours.map((time) => (
            <div key={time}>
              <label htmlFor={time}>{time}:00</label>
              <input
                id={time}
                name={`start_time`}
                type="radio"
                value={time}
                onChange={(e) => handleRadioChange(e, setFormData, formData)}
              ></input>
            </div>
          ))}
        </fieldset>
        <fieldset>
          <legend>What kind of appointment is this?</legend>
          <label htmlFor="single-radio">
            Single
            <input
              id="single-radio"
              type="radio"
              name="appointment_type"
              value="single"
              onChange={(e) => handleRadioChange(e, setFormData, formData)}
            />
          </label>
          <label htmlFor="recurring-radio">
            Recurring
            <input
              id="recurring-radio"
              type="radio"
              name="appointment_type"
              value="recurring"
              defaultChecked
              onChange={(e) => handleRadioChange(e, setFormData, formData)}
            />
          </label>
        </fieldset>
        <GreenButton>Request Appointment</GreenButton>
      </form>
    )
  ) : (
    <p>Please select a therapist</p>
  );
}

export default BookingSubmitter;
