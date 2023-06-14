import React from "react";
export default function TimeSelect({
  therapistSelected,
  therapist,
  schedule,
  testTimeOptArr,
  weekDay,
}) {
  let hours;
  let availableHours = [];

  if (therapist) {
    hours = therapist.availability.schedule[weekDay];
    hours.forEach((hour) => {
      for (let key in hour) {
        if (hour[key] === true) {
          availableHours.push(key);
        }
      }
    });
  }

  return therapistSelected ? (
    <fieldset>
      <legend>Select a time for your appointment:</legend>
      {availableHours.map((opt) => (
        <div key={opt}>
          <label htmlFor={opt}>{opt}</label>
          <input id={opt} name={`time-slots`} type="radio" value={opt}></input>
        </div>
      ))}
    </fieldset>
  ) : null;
}
