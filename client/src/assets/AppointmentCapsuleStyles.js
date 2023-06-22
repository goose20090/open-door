import styled from "styled-components";
import { Button, RedButton, VioletButton } from "../assets/Buttons";

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
  line-height: 25px;
  height: 25px;
`;
export const RescheduleButton = styled(VioletButton)`
  font-size: 12px;
  padding: 0 10px;
  line-height: 25px;
  height: 25px;
`;
export const CapButton = styled(Button)`
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
      : "var(--red2)"};
  color: ${({ status }) =>
    status === "confirmed"
      ? "var(--green11)"
      : status === "pending"
      ? "var(--amber11)"
      : "var(--red11)"};
  box-shadow: inset 0 0 0 1px
    ${({ status }) =>
      status === "confirmed"
        ? "var(--green7)"
        : status === "pending"
        ? "var(--amber7)"
        : "var(--red7)"};
`;
