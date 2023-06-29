import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { useState, useEffect } from "react";
import { useTherapists } from "../hooks/useTherapists";
import { handleRadioChange } from "../helpers/handleRadioChange";
import { getNextWorkingDay } from "../helpers/getNextWorkingDay";
import { StyledUpdateIcon } from "../assets/NewAppointmentStyles";
import { GreenButton } from "../assets/Buttons";
import { ScheduleQueryError } from "./Errors/ScheduleQueryError";
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
  DatePickerWrapper,
} from "../assets/NewAppointmentStyles";

export default function NewAppointmentForm({ setOpen }) {
  const { isLoading: therapistsLoading, data: therapists } = useTherapists();
  const initialDate = getNextWorkingDay();

  //   useEffect(() => {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       date: getNextWorkingDay(),
  //       week_day: date.getDay(),
  //     }));
  //   }, [date]);

  function handleSubmit(e) {
    e.preventDefault();
    fetchWithError("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      console.log(r);
    });
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
    isLoading: availabilityLoading,
  } = useMutualAvailabilitiesQuery(
    formData.therapist_id,
    formData.recurring ? formData.week_day : formData.date,
    formData.recurring
  );

  console.log(timeSlots);
  return (
    <FormGrid onSubmit={handleSubmit}>
      <InitialInputWrapper>
        <DialogTitle>Book a New Appointment</DialogTitle>
        <select
          placeholder="thearapists"
          style={{ width: "fit-content" }}
          onChange={(e) => handleTherapistChange(e)}
        >
          <option>{therapistsLoading ? "Loading..." : "please select a therapist"}</option>
          {therapistsLoading
            ? null
            : therapists.map((therapist) => (
                <option key={therapist.id} value={therapist.id}>
                  {therapist.name}
                </option>
              ))}
        </select>
        <DatePickerComponent
          enabled={!!formData.therapist_id}
          startDate={formData.date}
          setStartDate={(date) => setFormData({ ...formData, date: date, week_day: date.getDay() })}
        />
      </InitialInputWrapper>
      <TimeAndSubmitInputWrapper>
        <ErrorBoundary FallbackComponent={ScheduleQueryError}>
          {formData.therapist_id && isSuccess ? (
            <>
              <fieldset>
                <legend>Select a time for your appointment:</legend>
                {timeSlots.map((time) => (
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
              <GreenButton>Request Appointment</GreenButton>
            </>
          ) : (
            <p>Please select a therapist</p>
          )}
        </ErrorBoundary>
      </TimeAndSubmitInputWrapper>
    </FormGrid>
  );
}

const FormGrid = styled.form`
  display: grid;
  height: 60vh;
  width: 60vw;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "therapistDate timeSubmit"
    "therapistDate timeSubmit";
  background-color: black;
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
  grid-area: timeSubmit;
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

// <FormWrapper>
//   <HeaderWrapper>
//     <DialogTitle>Book a New Appointment</DialogTitle>
//     <DialogDescription className="DialogDescription">
//       Select a therapist and pick an available time.
//     </DialogDescription>
//   </HeaderWrapper>
//   <DateSelectWrapper>
//     <TherapistSelect
//       isLoading={isLoading}
//       therapists={therapists}
//       handleChange={handleChange}
//     />
//     <DatePickerWrapper>
//       <DatePickerComponent
//         enabled={therapistSelected}
//         startDate={selectedDate}
//         setStartDate={setSelectedDate}
//       />
//     </DatePickerWrapper>
//   </DateSelectWrapper>
//   <BookingSubmitterWrapper>
//     <BookingSubmitter
//       currentTherapistId={currentTherapistId}
//       therapistSelected={therapistSelected}
//       nextWorkingDay={nextWorkingDay.getDay}
//       selectedDate={selectedDate}
//       setOpen={setOpen}
//     />
//   </BookingSubmitterWrapper>
//   {isFetching ? <StyledUpdateIcon /> : null}
// </FormWrapper>
{
  /* <AppointmentRadios
                handleSubmit={handleSubmit}
                handleRadioChange={handleRadioChange}
                currentTherapistId={currentTherapistId}
                selectedDate={selectedDate}
                formData={formData}
                setFormData={setFormData}
              >
              </AppointmentRadios> */
}
