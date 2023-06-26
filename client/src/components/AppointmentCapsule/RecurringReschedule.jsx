import React, { useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/user";
import { useRecurringScheduleQuery } from "../../hooks/useRecurringScheduleQuery";
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
  console.log(appointment.client.name);

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
        <fieldset>
          <legend>
            <Label>Select a time for your appointment:</Label>
          </legend>
          {/* {availableHours.map((time) => (
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
        ))} */}
        </fieldset>
      </TimeAndDate>

      <RecurringAppointmentInfo appointment={formData} name={appointment.client.name} />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  );
}

export default RecurringReschedule;

const Form = styled.form`
  width: 100%;
  height: 60vh;
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
