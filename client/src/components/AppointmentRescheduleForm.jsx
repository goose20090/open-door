import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/user";
import { useMutualAvailabilitiesQuery } from "../hooks/useMutualAvailabilitiesQuery";
import { Confirmation, Label, Data, Title, Time } from "../assets/AppointmentCapsuleStyles";
import { GreenButton, Button, VioletButton } from "../assets/Buttons";
import { getNextAppointmentDate } from "../helpers/getNextAppointmentDate";
import DatePickerComponent from "./DatePickerComponent";
import { integerToWeekday } from "../helpers/integarToWeekday";
import RecurringAppointmentInfo from "./AppointmentCapsule/RecurringAppointmentInfo";
import { getNextWorkingDay } from "../helpers/getNextWorkingDay";
import { handleRadioChange } from "../helpers/handleRadioChange";
import fetchWithError from "../helpers/fetchWithError";
import NewAppointmentCapsule from "./AppointmentCapsule/AppointmentCapsule";
import { StyledUpdateIcon, Wrapper } from "../assets/NewAppointmentStyles";
import { formatRecurringTime } from "../helpers/formatRecurringTime";
import TooltipWrapper from "./RadixWrappers/TooltipWrapper";
import { formatSingleDate } from "../helpers/formatSingleDate";
import { sameAsInitialDate } from "../helpers/sameAsInitialDate";
import PlaceHolderSelect from "./PlaceHolderSelect";
import { useRescheduleMutation } from "../hooks/useRescheduleMutation";
import { renderRescheduleTitle } from "../helpers/renderRescheduleTitle";
import PlaceholderRadio from "./PlaceholderRadio";
import ErrorList from "./Errors/ErrorList";

function AppointmenRescheduleForm({ appointment, onCloseDialog }) {
  const { user, setUser } = useContext(UserContext);
  const { recurring } = appointment;
  const rescheduleAppointment = useRescheduleMutation(appointment, onCloseDialog);
  const { isError } = rescheduleAppointment;
  const status = !!appointment.rescheduled_by ? "reschedule" : appointment.status;

  const rescheduledBy =
    appointment.status === "confirmed" || !!appointment.rescheduled_by
      ? user.user_type.toLowerCase()
      : null;
  const requestRecipient =
    user.user_type === "Client" ? appointment.therapist.name : appointment.client.name;

  const nonUserId = user.user_type === "Client" ? appointment.therapist.id : appointment.client.id;

  const [formData, setFormData] = useState({
    date: appointment.date,
    start_time: appointment.start_time,
    week_day: appointment.week_day,
    recurring: appointment.recurring,
    status: "pending",
    rescheduled_by: rescheduledBy,
    rollback_start_time: appointment.start_time,
    rollback_week_day: appointment.week_day,
    rollback_date: appointment.date,
    rejected_by: null,
  });

  function handleSubmit(e) {
    e.preventDefault();
    rescheduleAppointment.mutate(formData);
  }
  let weekDayOrDateQueryKey;
  if (recurring) {
    weekDayOrDateQueryKey = formData.week_day;
  } else {
    weekDayOrDateQueryKey = formData.date;
  }

  const {
    data: timeSlots,
    isSuccess,
    isLoading,
    isFetching: availabilityFetching,
  } = useMutualAvailabilitiesQuery(
    nonUserId,
    weekDayOrDateQueryKey,
    appointment.recurring,
    appointment.id
  );

  return (
    <Form onSubmit={handleSubmit}>
      {availabilityFetching || rescheduleAppointment.isLoading ? <StyledUpdateIcon /> : null}
      <RescheduleTitle>
        {renderRescheduleTitle(user, appointment, requestRecipient)}
      </RescheduleTitle>
      <Grid>
        <DayWrapper>
          {appointment.recurring ? (
            <label htmlFor="week-day-select">
              Select a new day for your new appointment:
              <Select
                id="week-day-select"
                value={formData.week_day}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    week_day: e.target.value,
                  })
                }
              >
                <option value={1}>Monday</option>
                <option value={2}>Tuesday</option>
                <option value={3}>Wednesday</option>
                <option value={4}>Thursday</option>
                <option value={5}>Friday</option>
              </Select>
            </label>
          ) : (
            <>
              Select a date for your new appointment:
              <DatePickerComponent
                startDate={new Date(formData.date)}
                setStartDate={(date) => {
                  setFormData({
                    ...formData,
                    date: date,
                  });
                }}
                enabled={true}
              />
            </>
          )}
        </DayWrapper>
        <TimeWrapper>
          {isLoading ? (
            <PlaceholderRadio />
          ) : (
            <Fieldset>
              <legend>Select a time for your new appointment</legend>
              {timeSlots.map((slot) => (
                <label htmlFor={slot} key={slot}>
                  <input
                    type="radio"
                    name="start_time"
                    id={slot}
                    value={slot}
                    checked={slot == formData.start_time}
                    onChange={(e) => handleRadioChange(e, setFormData, formData)}
                  />
                  {slot}:00
                </label>
              ))}
            </Fieldset>
          )}
        </TimeWrapper>
        <AppointmenGridArea>
          <AppointmentWrapper>
            Your Appointment:
            <NewAppointment>
              <div>
                <AppointmentTitle>{requestRecipient}</AppointmentTitle>
                <AppointmentTime>
                  {appointment.recurring
                    ? formatRecurringTime(formData.start_time, formData.week_day)
                    : formatSingleDate(formData.start_time, formData.date)}
                </AppointmentTime>
              </div>
              {!!appointment.rescheduled_by || appointment.status === "confirmed" ? (
                <>
                  <RescheduleStatus as="div" status={"pending"}>
                    pending
                  </RescheduleStatus>
                  <RescheduleStatus as="div" status={"reschedule"}>
                    reschedule
                  </RescheduleStatus>
                </>
              ) : (
                <RescheduleStatus as="div" status={"pending"}>
                  pending
                </RescheduleStatus>
              )}
            </NewAppointment>
            <ButtonWrapper>
              {sameAsInitialDate(formData, appointment) ? (
                <TooltipWrapper
                  textContent={"Please choose a new day/start time to reschedule appointment"}
                  sideOffset={5}
                >
                  <SubmitButton disabled={true} status={status}>
                    Submit
                  </SubmitButton>
                </TooltipWrapper>
              ) : (
                <>
                  <SubmitButton type="submit" status={status}>
                    Submit
                  </SubmitButton>
                  {isError ? <ErrorList errors={rescheduleAppointment.error} /> : null}
                </>
              )}
            </ButtonWrapper>
          </AppointmentWrapper>
        </AppointmenGridArea>
      </Grid>
    </Form>
  );
}

export default AppointmenRescheduleForm;

const DayWrapper = styled.div`
  grid-area: day;
  color: rgb(104, 112, 118);
  font-size: 0.9rem;
  line-height: 1.3;
`;

const RescheduleTitle = styled(Title)`
  grid-area: title;
  font-size: 1.4rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2rem 1fr min(250px, 1fr);
  /* height: fit-content; */
  /* height: 40%; */
  /* width: 100%; */
  /* max-height: 40%; */
  background-color: white;
  gap: 1px;
  grid-template-areas:
    "title title"
    "day time"
    "appointment appointment";
`;

const TimeWrapper = styled.div`
  grid-area: time;
  color: rgb(104, 112, 118);
  font-size: 0.9rem;
  line-height: 1.3;
  display: flex;
  justify-content: center;
  label {
    display: flex;
    justify-content: space-between;
    font-size: 0.95rem;
    width: 80px;
    margin-left: 5%;
  }
  input {
    margin-left: 5px;
  }
  fieldset {
    justify-self: center;
    display: flex;
    border-radius: 8px;
    border: 1px solid var(--blackA9);
  }
`;

const SubmitButton = styled(VioletButton)`
  width: 100%;
  margin-left: 8px;
  background-color: ${({ status }) =>
    status === "confirmed" || status === "reschedule" ? "var(--violet4)" : "var(--amber4)"};
  color: ${({ status }) =>
    status === "confirmed" || status === "reschedule" ? "var(--violet11)" : "var(--amber11)"};

  &:hover {
    background-color: ${({ status }) =>
      status === "confirmed" || status === "reschedule" ? "var(--violet5)" : "var(--amber5)"};
  }
  // &:focus {
  //   box-shadow: 0 0 0 2px var(--violet7);
  // }

  &:disabled {
    background-color: ${({ status }) =>
      status === "confirmed" || status === "reschedule" ? "var(--violet1)" : "var(--amber2)"};
    color: ${({ status }) =>
      status === "confirmed" || status === "reschedule" ? "var(--violet7)" : "var(--amber5)"};
  }
`;

const AppointmentWrapper = styled.div`
  justify-self: center;
  min-width: fit-content;
  width: 400px;
  align-self: center;
  padding: 10px;
  color: rgb(104, 112, 118);
  font-size: 0.9rem;
  line-height: 1.3;
`;
export const NewAppointment = styled.div`
  background-color: white;
  border-radius: 6px;
  width: 100%;
  padding: 50px;
  --shadow-color: 176deg 27% 46%;
  border: 1px solid var(--blackA7);
  box-shadow: 0.5px 0.6px 0.9px hsl(var(--shadow-color) / 0.34),
    0.9px 1px 1.5px -1.2px hsl(var(--shadow-color) / 0.34),
    2.1px 2.4px 3.6px -2.5px hsl(var(--shadow-color) / 0.34);
  padding: 15px;
  display: flex;
  justify-content: space-evenly;
  position: relative;
  column-gap: 15px;
  align-items: center;
  margin: 8px;
  height: fit-content;
`;
const AppointmenGridArea = styled.div`
  grid-area: appointment;
  height: 100%;
  display: grid;
  width: 100%;
`;

const AppointmentTitle = styled(Title)``;

const AppointmentTime = styled(Time)``;

export const RescheduleStatus = styled(Button)`
  margin-left: auto;
  grid-area: status;
  align-self: center;
  justify-self: center;
  font-size: 12px;
  padding: 0 10px;
  line-height: 25px;
  height: 25px;
  background-color: ${({ status }) =>
    status === "confirmed" || status === "reschedule" ? "var(--violet2)" : "var(--amber2)"};
  color: ${({ status }) =>
    status === "confirmed" || status === "reschedule" ? "var(--violet11)" : "var(--amber11)"};
  box-shadow: inset 0 0 0 1px
    ${({ status }) =>
      status === "confirmed" || status == "reschedule" ? "var(--violet7)" : "var(--amber7)"};
`;

const ButtonWrapper = styled.div`
  padding-right: 30px;
`;
const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  grid-area: input;
  height: fit-content;
  max-width: 80%;
`;

const Form = styled.form`
  width: fit-content;
  height: fit-content;
  padding: 0 5%;
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

const StyledLabel = styled(Label)`
  display: flex;
  flex-direction: column;
`;

const Select = styled.select`
  padding: 8px;
  margin-top: 16px;
  width: 80%;
  min-width: min-content;
  padding: 10px;
  /* color: rgb(104, 112, 118); */
  font-size: 0.9rem;
`;
