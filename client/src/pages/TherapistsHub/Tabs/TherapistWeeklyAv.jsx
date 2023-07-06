import React, { useState, useContext, useEffect } from "react";
import ErrorList from "../../../components/Errors/ErrorList";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { GreenButton } from "../../../assets/Buttons";
import { UserContext } from "../../../context/user";
import { useScheduleQuery } from "../../../hooks/useScheduleQuery";
import fetchWithError from "../../../helpers/fetchWithError";
import { Time, Title } from "../../../assets/AppointmentCapsuleStyles";
import { useScheduleMutation } from "../../../hooks/useScheduleMutation";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../../../components/Errors/ErrorFallback";
import { StyledUpdateIcon } from "../../../assets/NewAppointmentStyles";

export function TherapistWeeklyAv() {
  const { user } = useContext(UserContext);
  const {
    data: fetchedSchedule,
    isLoading,
    isSuccess,
    isError: isQueryError,
  } = useScheduleQuery(user.id);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hours = [9, 10, 11, 12, 13, 14, 15, 16];

  const initialSchedule = Object.fromEntries(
    days.map((day) => [day.toLowerCase(), hours.map((hour) => ({ [hour]: true }))])
  );

  const [schedule, setSchedule] = useState(initialSchedule);
  const updateSchedule = useScheduleMutation(schedule, user);

  useEffect(() => {
    if (isSuccess) {
      setSchedule(fetchedSchedule);
    }
  }, [isSuccess, fetchedSchedule]);
  const toggleAvailability = (day, hour) => {
    setSchedule({
      ...schedule,
      [day]: schedule[day].map((hourObj) =>
        Object.keys(hourObj)[0] == hour ? { [hour]: !hourObj[hour] } : hourObj
      ),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSchedule.mutate();
  };
  return (
    <ScheduleForm onSubmit={handleSubmit}>
      {updateSchedule.isLoading ? <StyledUpdateIcon /> : null}
      {isQueryError ? (
        <ErrorList errors={["Error: schedule request failed, please try again."]} />
      ) : null}
      <TableWrapper>
        {/* <StyledUpdateIcon /> */}
        <Instructions>
          Please uncheck boxes where you are <i>not</i> available:
        </Instructions>
        <ScheduleTable>
          <thead>
            <tr>
              <TableHeading>
                <Title>Hour/Day</Title>
              </TableHeading>
              {days.map((day) => (
                <TableHeading key={day}>
                  <Title>{day}</Title>
                </TableHeading>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <Cell>
                  <Title>{`${hour}:00`} </Title>
                </Cell>
                {days.map((day) => (
                  <Cell key={day}>
                    <Checkbox
                      type="checkbox"
                      checked={
                        schedule[day.toLowerCase()].find(
                          (hourObj) => Object.keys(hourObj)[0] == hour
                        )[hour]
                      }
                      disabled={!isSuccess}
                      onChange={() => toggleAvailability(day.toLowerCase(), hour)}
                    />
                  </Cell>
                ))}
              </tr>
            ))}
          </tbody>
        </ScheduleTable>
        <SubmitButton type="submit">Submit</SubmitButton>
      </TableWrapper>
    </ScheduleForm>
  );
}

const Checkbox = styled.input`
  width: 15px;
  height: 15px;
  accent-color: var(--blue9);
`;

const Instructions = styled.p`
  margin: 0px;
  color: rgb(104, 112, 118);
  font-size: 0.9rem;
  line-height: 1.3;
`;

const TableWrapper = styled.div`
  position: ;
  justify-self: center;
  width: 80%;
`;

const Cell = styled.td`
  text-align: center;
`;

const TableHeading = styled.th`
  padding: 8px;
`;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const ScheduleForm = styled.form`
  position: relative;
  display: grid;
  padding-top: 25px;
  height: 100%;
`;

const ScheduleTable = styled.table`
  /* border: 1px solid var(--blackA7); */
  background-color: white;
  /* border-radius: 8px; */
  height: 60%;
  width: 100%;
`;

const SubmitButton = styled(GreenButton)`
  margin-top: 25px;
  width: 20%;
  float: right;
  box-shadow: inset 0 0 0 2px var(--green7);
`;
