import React from "react";
import { useQuery } from "@tanstack/react-query";
export default function TimeSelect({
  therapistSelected,
  currentTherapistId,
  testTimeOptArr,
  weekDay,
}) {
  async function fetchTherapistSchedule(therapistId) {
    const res = await fetch(`/api/therapists/${therapistId}/schedule`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  }

  const currentTherapistDefaultScheduleQuery = useQuery(
    ["therapist", "schedule"],
    () => fetchTherapistSchedule(currentTherapistId, weekDay),
    {
      enabled: !!currentTherapistId,
    }
  );

  const {
    isLoading,
    isSuccess,
    data: schedule,
  } = currentTherapistDefaultScheduleQuery;

  let hours;
  let availableHours = [];

  if (isSuccess) {
    hours = schedule[weekDay];
    hours.forEach((hour) => {
      for (let key in hour) {
        if (hour[key] === true) {
          availableHours.push(key);
        }
      }
    });
  }

  return therapistSelected ? (
    isLoading ? (
      <p>Loading</p>
    ) : (
      <fieldset>
        <legend>Select a time for your appointment:</legend>
        {availableHours.map((time) => (
          <div key={time}>
            <label htmlFor={time}>{time}:00</label>
            <input
              id={time}
              name={`time-slots`}
              type="radio"
              value={time}
            ></input>
          </div>
        ))}
      </fieldset>
    )
  ) : (
    <p>Please select a therapist</p>
  );
}
