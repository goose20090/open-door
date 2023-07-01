import styled from "styled-components";
import { Button, RedButton, VioletButton, GreenButton } from "../assets/Buttons";

export const Title = styled.div`
  grid-area: title / title / title / title;
  margin-bottom: 5px;
  font-weight: 500;
  color: rgb(17, 24, 28);
  font-size: 15px;
`;
export const Time = styled.div`
  grid-area: description / description / description / description;
  margin: 0px;
  color: rgb(104, 112, 118);
  font-size: 13px;
  line-height: 1.3;
`;
export const CancelButton = styled(RedButton)`
  font-size: 12px;
  padding: 0 10px;
  margin-right: 10px;
  line-height: 25px;
  height: 25px;
`;
export const RescheduleButton = styled(VioletButton)`
  font-size: 12px;
  padding: 0 10px;
  line-height: 25px;
  height: 25px;
  background-color: ${({ status }) => (status === "pending" ? "var(--amber3)" : null)};
  color: ${({ status }) => (status === "pending" ? "var(--amber11)" : null)};
  &:hover {
    background-color: ${({ status }) => (status === "pending" ? "var(--amber4)" : null)};
  }

  &:focus {
    box-shadow: ${({ status }) => (status === "pending" ? "0 0 0 2px var(--amber7)" : null)};
  }
`;
export const Status = styled(Button)`
  margin-left: auto;
  grid-area: status;
  align-self: center;
  justify-self: center;
  font-size: 12px;
  padding: 0 10px;
  line-height: 25px;
  height: 25px;
  background-color: ${({ status }) =>
    status === "confirmed"
      ? "var(--green2)"
      : status === "pending"
      ? "var(--amber2)"
      : status === "reschedule"
      ? "var(--violet2)"
      : "var(--red2)"};

  color: ${({ status }) =>
    status === "confirmed"
      ? "var(--green11)"
      : status === "pending"
      ? "var(--amber11)"
      : status === "reschedule"
      ? "var(--violet11)"
      : "var(--red11)"};

  box-shadow: inset 0 0 0 1px
    ${({ status }) =>
      status === "confirmed"
        ? "var(--green7)"
        : status === "pending"
        ? "var(--amber7)"
        : status === "reschedule"
        ? "var(--violet7)"
        : "var(--red7)"};
`;
export const Label = styled(Time)`
  font-size: 0.9rem;
  display: block;
  padding-top: 10px;
  font-weight: bold;
  &:first-of-type {
    padding-top: 10px;
  }
`;
export const Data = styled.span`
  font-weight: normal;
`;
export const SubmitButton = styled(GreenButton)`
  position: absolute;
  bottom: 30px;
  right: 30px;
`;
export const Form = styled.form`
  padding-bottom: 10px;
`;

export const Confirmation = styled(Title)`
  font-size: 1.2rem;
`;
