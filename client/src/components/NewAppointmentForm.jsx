import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useTherapists } from "../hooks/useTherapists";
import { ErrorBoundary } from "react-error-boundary";
import { handleRadioChange } from "../helpers/handleRadioChange";
import { getNextWorkingDay } from "../helpers/getNextWorkingDay";
import { StyledUpdateIcon } from "../assets/NewAppointmentStyles";
import { GreenButton } from "../assets/Buttons";
import { ErrorFallback } from "./Errors/ErrorFallback";
import { useMutualAvailabilitiesQuery } from "../hooks/useMutualAvailabilitiesQuery";
import fetchWithError from "../helpers/fetchWithError";
import DatePickerComponent from "./DatePickerComponent";
import {
  FormWrapper,
  HeaderWrapper,
  DateSelectWrapper,
  BookingSubmitterWrapper,
  DialogTitle,
  DialogDescription,
} from "../assets/NewAppointmentStyles";
import { useCreateAppointmentMutation } from "../hooks/useCreateAppointmentMutation";
import ErrorList from "./Errors/ErrorList";

export default function NewAppointmentForm({ onCloseDialog }) {
  const { isLoading: therapistsLoading, data: therapists, isError } = useTherapists();
  const initialDate = getNextWorkingDay();
  const createApppointment = useCreateAppointmentMutation(onCloseDialog);
  let errors;
  if (createApppointment.isError) {
    errors = createApppointment.error;
  }

  function handleSubmit(e) {
    e.preventDefault();
    createApppointment.mutate(formData);
  }

  const [formData, setFormData] = useState({
    date: initialDate,
    week_day: initialDate.getDay(),
    start_time: null,
    recurring: true,
    therapist_id: null,
  });

  function handleTherapistChange(e) {
    setFormData({
      ...formData,
      therapist_id: e.target.value,
    });
  }

  let weekDayOrDateQueryKey;
  if (formData.recurring) {
    weekDayOrDateQueryKey = formData.week_day;
  } else {
    weekDayOrDateQueryKey = formData.date;
  }

  const {
    data: timeSlots,
    isSuccess,
    isFetching,
    isLoading: availabilityLoading,
  } = useMutualAvailabilitiesQuery(
    formData.therapist_id,
    formData.recurring ? formData.week_day : formData.date,
    formData.recurring
  );

  if (isSuccess && !formData.start_time) {
    setFormData({ ...formData, start_time: timeSlots[0] });
  }

  return (
    <FormGrid onSubmit={handleSubmit}>
      {isFetching && createApppointment.isLoading ? <StyledUpdateIcon /> : null}
      <NewAppointmentTitle>Book a New Appointment</NewAppointmentTitle>
      <SelectWrapper>
        <select placeholder="thearapists" onChange={(e) => handleTherapistChange(e)}>
          <option value={false}>
            {therapistsLoading ? "Loading..." : "Please select a therapist"}
          </option>
          {therapistsLoading
            ? null
            : therapists.map((therapist) => (
                <option key={therapist.id} value={therapist.id}>
                  {therapist.name}
                </option>
              ))}
        </select>
      </SelectWrapper>
      <DatePickerWrapper>
        <DatePickerComponent
          enabled={!!formData.therapist_id}
          startDate={formData.date}
          setStartDate={(date) => setFormData({ ...formData, date: date, week_day: date.getDay() })}
        />
      </DatePickerWrapper>
      <TimeWrapper>
        {formData.therapist_id && isSuccess ? (
          <>
            <fieldset>
              <legend>Select a time for your appointment:</legend>
              {timeSlots.map((time) => (
                <TimeRadio key={time}>
                  <label htmlFor={time}>{time}:00</label>
                  <input
                    id={time}
                    name={`start_time`}
                    type="radio"
                    value={time}
                    checked={formData.start_time === time}
                    onChange={(e) => handleRadioChange(e, setFormData, formData)}
                  />
                </TimeRadio>
              ))}
            </fieldset>
          </>
        ) : (
          <fieldset>
            <legend>Select a time for your appointment</legend>
            <TimeRadio>
              <label>9:00</label>
              <input type="radio" disabled></input>
            </TimeRadio>
            <TimeRadio>
              <label>10:00</label>
              <input type="radio" disabled></input>
            </TimeRadio>
            <TimeRadio>
              <label>11:00</label>
              <input type="radio" disabled></input>
            </TimeRadio>
            <TimeRadio>
              <label>12:00</label>
              <input type="radio" disabled></input>
            </TimeRadio>
            <TimeRadio>
              <label>13:00</label>
              <input type="radio" disabled></input>
            </TimeRadio>
            <TimeRadio>
              <label>14:00</label>
              <input type="radio" disabled></input>
            </TimeRadio>
            <TimeRadio>
              <label>15:00</label>
              <input type="radio" disabled></input>
            </TimeRadio>
            <TimeRadio>
              <label>16:00</label>
              <input type="radio" disabled></input>
            </TimeRadio>
          </fieldset>
        )}
      </TimeWrapper>
      <TypeWrapper>
        <fieldset>
          <legend>What kind of appointment is this?</legend>
          <label htmlFor="single-radio">
            Single
            <input
              id="single-radio"
              type="radio"
              name="recurring"
              value={false}
              checked={!formData.recurring}
              onChange={(e) => {
                setFormData({ ...formData, recurring: false });
              }}
            />
          </label>
          <label htmlFor="recurring-radio">
            Recurring
            <input
              id="recurring-radio"
              type="radio"
              name="recurring"
              value={true}
              checked={formData.recurring}
              onChange={(e) => {
                setFormData({ ...formData, recurring: true });
              }}
            />
          </label>
        </fieldset>
      </TypeWrapper>
      <SubmitWrapper>
        {createApppointment.isError ? <ErrorList errors={errors} /> : null}

        <SubmitButton>Request Appointment</SubmitButton>
      </SubmitWrapper>
      <TimeAndSubmitInputWrapper>
        <ErrorBoundary FallbackComponent={ErrorFallback}></ErrorBoundary>
      </TimeAndSubmitInputWrapper>
    </FormGrid>
  );
}

const TimeRadio = styled.div`
  display: flex;
`;
const TypeWrapper = styled.div`
  grid-area: type;
  align-self: start;
  /* margin: 0px; */
  color: rgb(104, 112, 118);
  font-size: 0.9rem;
  line-height: 1.3;
  label {
    padding: 0 8px;
    font-size: 0.95rem;
  }
  input {
    margin-left: 5px;
  }
  fieldset {
    display: flex;
    border-radius: 8px;
    border: 1px solid var(--blackA9);
  }
`;
const TimeWrapper = styled.div`
  grid-area: time;
  padding-top: 30px;
  margin: 0px;
  color: rgb(104, 112, 118);
  font-size: 0.9rem;
  line-height: 1.3;
  label {
    font-size: 0.95rem;
    min-width: 75px;
  }
  fieldset {
    border-radius: 8px;
    border: 1px solid var(--blackA9);
  }
`;

const SubmitWrapper = styled.div`
  grid-area: submit;
  display: flex;
  flex-direction: column;
  /* justify-self: center; */
  /* justify-content: flex-end; */
  align-self: flex-start;
`;

const SubmitButton = styled(GreenButton)`
  width: 100%;
  padding: 0;
`;

const NewAppointmentTitle = styled(DialogTitle)`
  grid-area: title;
  font-size: 1.6rem;
`;

const DatePickerWrapper = styled.div`
  grid-area: date;
  align-self: end;
  justify-self: start;
`;

const SelectWrapper = styled.div`
  grid-area: select;
  padding-top: 32px;
  width: 240px;
  color: rgb(104, 112, 118);
  font-size: 0.9rem;
  line-height: 1.3;
  select {
    width: 100%;
  }
  /* align-self: center; */
  justify-self: start;
`;

const FormGrid = styled.form`
  display: grid;
  height: 60vh;
  width: 60vw;
  max-width: 750px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1.6rem repeat(3, 1fr), 2rem;
  grid-template-areas:
    "title title"
    "select time"
    "date time"
    "date type"
    "null submit";
  background-color: white;
  gap: 1px;
`;

const InitialInputWrapper = styled.div`
  grid-area: therapistDate;
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const TimeAndSubmitInputWrapper = styled.div`
  /* grid-area: time; */
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
