import React from "react";
export default function TimeSelect() {
  const testTimeOptArr = ["1", "2", "3", "4", "5"];

  return (
    <fieldset>
      <legend>Select a time for your appointment:</legend>
      {testTimeOptArr
        ? testTimeOptArr.map((opt) => (
            <div key={opt}>
              <label htmlFor={opt}>{opt}</label>
              <input id={opt} name={`options`} type="radio" value={opt}></input>
            </div>
          ))
        : null}
    </fieldset>
  );
}
