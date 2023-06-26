import React, { useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/user";
import { useMutualAvailabilitiesQuery } from "../../hooks/useMutualAvailabilitiesQuery";
import {
  Confirmation,
  Label,
  Data,
  SubmitButton,
  Title,
} from "../../assets/AppointmentCapsuleStyles";
import { getNextAppointmentDate } from "../../helpers/getNextAppointmentDate";
import DatePickerComponent from "../DatePickerComponent";
import { WEEKDAYS } from "../../data/constants";
import { integerToWeekday } from "../../helpers/integarToWeekday";
import RecurringAppointmentInfo from "./RecurringAppointmentInfo";
import { getNextWorkingDay } from "../../helpers/getNextWorkingDay";
import { handleRadioChange } from "../../helpers/handleRadioChange";

function RecurringReschedule({ appointment }) {
  const [formData, setFormData] = useState({
    date: appointment.date,
    start_time: appointment.start_time,
    week_day: appointment.week_day,
  });

  function handleSelectChange(e) {
    setFormData({
      ...formData,
      week_day: e.target.value,
    });
  }

  const {
    data: timeSlots,
    isSuccess,
    isLoading,
  } = useMutualAvailabilitiesQuery(appointment.client.id, appointment.date, appointment.recurring);

  return (
    <Form>
      <Confirmation>Reschedule this recurring appointment?</Confirmation>
      <SubHeading>Current Appointment:</SubHeading>
      <RecurringAppointmentInfo appointment={appointment} />
      <TimeAndDate>
        <Label htmlfor="week-day-select">
          Select a day for your new appointment:
          <select id="week-day-select" value={formData.week_day} onChange={handleSelectChange}>
            <option value={1}>Monday</option>
            <option value={2}>Tuesday</option>
            <option value={3}>Wednesday</option>
            <option value={4}>Thursday</option>
            <option value={5}>Friday</option>
          </select>
        </Label>
        <Fieldset>
          <legend>
            <Label>Select a time for your appointment:</Label>
          </legend>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            timeSlots.map((slot) => (
              <label htmlFor={slot} key={slot}>
                <input
                  type="radio"
                  name="start_time"
                  id={slot}
                  defaultChecked={appointment.start_time == slot}
                  value={slot}
                  onChange={(e) => handleRadioChange(e, setFormData, formData)}
                />
                {slot}:00
              </label>
            ))
          )}
        </Fieldset>
      </TimeAndDate>

      <RecurringAppointmentInfo appointment={formData} name={appointment.client.name} />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  );
}

export default RecurringReschedule;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  width: 100%;
  height: 60vh;
  padding-left: 5%;
`;

const SubHeading = styled(Title)``;

const TimeAndDate = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
`;

const DateWrapper = styled.div`
  padding-top: 10px;
`;
// const {
//   isSuccess,
//   isLoading,
//   data: schedule,
//   isFetching,
// } = useRecurringScheduleQuery(appointment.client.id, weekDay);

// let availableHours;

// if (isSuccess) {
//   availableHours = getAvailableHours(schedule, formData.week_day);
// }

// if (isLoading) {
//   return <p>Loading...</p>;
// }

// const {
//   isSuccess,
//   isLoading,
//   data: schedule,
//   isFetching,
// } = useRecurringScheduleQuery(appointment.client.id, appointment.date, appointment.recurring);

// if (isSuccess) {
//   console.log(schedule);
// }
