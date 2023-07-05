import React, { useState, useContext, useEffect } from "react";
import ErrorList from "../../../components/Errors/ErrorList";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { GreenButton } from "../../../assets/Buttons";
import { UserContext } from "../../../context/user";
import { useScheduleQuery } from "../../../hooks/useScheduleQuery";
import fetchWithError from "../../../helpers/fetchWithError";
import { Title } from "../../../assets/AppointmentCapsuleStyles";
import { useScheduleMutation } from "../../../hooks/useScheduleMutation";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../../../components/Errors/ErrorFallback";

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
      {isQueryError ? (
        <ErrorList errors={["Error: schedule request failed, please try again."]} />
      ) : null}
      <TableWrapper>
        <p>
          Please uncheck boxes where you are <i>not</i> available:
        </p>
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
                    <input
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
      {/* </ErrorBoundary> */}
    </ScheduleForm>
  );
}

const TableWrapper = styled.div`
  justify-self: center;
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
`;

const ScheduleForm = styled.form`
  display: grid;
  padding-top: 25px;
`;

const ScheduleTable = styled.table`
  border: 1px solid black;
  background-color: white;
  border-radius: 8px;
  --shadow-color: 176deg 27% 46%;
  box-shadow: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),
    0.4px 0.8px 1px -1.2px hsl(var(--shadow-color) / 0.34),
    1px 2px 2.5px -2.5px hsl(var(--shadow-color) / 0.34);
`;

const SubmitButton = styled(GreenButton)`
  margin-top: 25px;
  margin-right: -25px;
  float: right;
`;
