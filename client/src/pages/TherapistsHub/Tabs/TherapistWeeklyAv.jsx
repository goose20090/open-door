import React, { useState, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { GreenButton } from "../../../assets/Buttons";
import { UserContext } from "../../../context/user";
import { useAvailabilityQuery } from "../../../hooks/useAvailabilityQuery";
import fetchWithError from "../../../helpers/fetchWithError";

export function TherapistWeeklyAv() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hours = [9, 10, 11, 12, 13, 14, 15, 16];
  const { user } = useContext(UserContext);
  const { data: therapistAvailability, isLoading, isSuccess } = useAvailabilityQuery(user.id);

  const initialAvailability = Object.fromEntries(
    days.map((day) => [day.toLowerCase(), hours.map((hour) => ({ [hour]: true }))])
  );

  const [availability, setAvailability] = useState(initialAvailability);
  useEffect(() => {
    if (isSuccess) {
      console.log(therapistAvailability);
      setAvailability(therapistAvailability);
    }
  }, [isSuccess, therapistAvailability]);
  const toggleAvailability = (day, hour) => {
    setAvailability({
      ...availability,
      [day]: availability[day].map((hourObj) =>
        Object.keys(hourObj)[0] == hour ? { [hour]: !hourObj[hour] } : hourObj
      ),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWithError(`/api/${user.id}/schedule/availability`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ availability: availability }),
    }).then((r) => console.log(r));

    console.log(availability);
  };
  return (
    <ScheduleForm onSubmit={handleSubmit}>
      <TableWrapper>
        <p>
          Please uncheck boxes where you are <i>not</i> available:
        </p>
        <ScheduleTable>
          <thead>
            <tr>
              <TableHeading>Hour/Day</TableHeading>
              {days.map((day) => (
                <TableHeading key={day}>{day}</TableHeading>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <Cell>{`${hour}:00`}</Cell>
                {days.map((day) => (
                  <Cell key={day}>
                    <input
                      type="checkbox"
                      checked={
                        availability[day.toLowerCase()].find(
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
