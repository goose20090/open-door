import React from "react";
export default function TherapistSelect({
  isLoading,
  therapists,
  handleChange,
  selectPlaceHolder,
  setTherapist,
}) {
  return (
    <select
      placeholder="thearapists"
      style={{ width: "fit-content" }}
      onChange={(e) => handleChange(e)}
    >
      <option>{isLoading ? "Loading..." : selectPlaceHolder}</option>
      {isLoading
        ? null
        : therapists.map((therapist) => (
            <option key={therapist.id} value={therapist.id}>
              {therapist.name}
            </option>
          ))}
    </select>
  );
}
