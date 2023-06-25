import React, { useContext } from "react";
import { GreenButton } from "../assets/Buttons";
import { UpdateIcon } from "@radix-ui/react-icons";
import { handleRadioChange } from "../helpers/handleRadioChange";
import { useScheduleQuery } from "../hooks/useScheduleQuery";
import { getAvailableHours } from "../helpers/getAvailableHours";
import { UserContext } from "../context/user";
import styled from "styled-components";

export function AppointmentRadios({
  handleRadioChange,
  currentTherapistId,
  selectedDate,
  formData,
  setFormData,
  children,
}) {
  const { user } = useContext(UserContext);
  const {
    isSuccess,
    isLoading,
    data: schedule,
    isFetching,
  } = useScheduleQuery(currentTherapistId, selectedDate, user.user_type);

  let availableHours;

  if (isSuccess) {
    availableHours = getAvailableHours(schedule, formData.week_day);
  }

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
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
            />
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
      {children}
    </>
  );
}
