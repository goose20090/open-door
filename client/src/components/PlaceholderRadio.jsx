import styled from "styled-components";
import { TimeRadio } from "./NewAppointmentForm";

export default function PlaceholderRadio() {
  return (
    <Wrapper>
      <legend>Select a time for your new appointment</legend>
      <TimeRadio>
        <label>
          <input type="radio" disabled></input>9:00
        </label>
      </TimeRadio>
      <TimeRadio>
        <label>
          <input type="radio" disabled></input>10:00
        </label>
      </TimeRadio>
      <TimeRadio>
        <label>
          <input type="radio" disabled></input>11:00
        </label>
      </TimeRadio>
      <TimeRadio>
        <label>
          <input type="radio" disabled></input>12:00
        </label>
      </TimeRadio>
      <TimeRadio>
        <label>
          <input type="radio" disabled></input>13:00
        </label>
      </TimeRadio>
      <TimeRadio>
        <label>
          <input type="radio" disabled></input>14:00
        </label>
      </TimeRadio>
      <TimeRadio>
        <label>
          <input type="radio" disabled></input>15:00
        </label>
      </TimeRadio>
      <TimeRadio>
        <label>
          <input type="radio" disabled></input>16:00
        </label>
      </TimeRadio>
    </Wrapper>
  );
}

const Wrapper = styled.fieldset`
  flex-direction: column;
  height: fit-content;
`;
