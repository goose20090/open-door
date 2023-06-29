import React from "react";

export default function PlaceHolderSelect() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>
        <input type="radio" value={9} disabled />
        9:00
      </label>
      <label>
        <input type="radio" value={9} disabled />
        10:00
      </label>
      <label>
        <input type="radio" value={9} disabled />
        11:00
      </label>
      <label>
        <input type="radio" value={9} disabled />
        12:00
      </label>
      <label>
        <input type="radio" value={9} disabled />
        13:00
      </label>
      <label>
        <input type="radio" value={9} disabled />
        14:00
      </label>
      <label>
        <input type="radio" value={9} disabled />
        15:00
      </label>
      <label>
        <input type="radio" value={9} disabled />
        16:00
      </label>
    </div>
  );
}
