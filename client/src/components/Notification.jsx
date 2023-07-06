import React from "react";
import styled from "styled-components";
import { Status, Time, Title } from "../assets/AppointmentCapsuleStyles";
import { formatDetails } from "../helpers/formatDetails";
import { CheckIcon, QuestionMarkIcon, Cross2Icon } from "@radix-ui/react-icons";
import { relativeDate } from "../helpers/relativeDate";

export default function Notification({ notification }) {
  // debugger;
  const typeTitles = {
    confirm: "Appointment Confirmed",
    reject: "Appointment Rejected",
    reschedule_confirm: "Reschedule Confirmed",
    reschedule_reject: "Reschedule Rejected",
    reschedule_request: "Reschedule Requested",
    delete: "Appointment Deleted",
  };

  const typeIcons = {
    confirm: <CheckIcon />,
    reject: <Cross2Icon />,
    reschedule_confirm: <CheckIcon />,
    reschedule_reject: <Cross2Icon />,
    delete: <Cross2Icon />,
    reschedule_request: <QuestionIcon />,
  };
  return (
    <Wrapper>
      <NotificationIcon type={notification.notification_type}>
        {typeIcons[notification.notification_type]}
      </NotificationIcon>
      <NotificationTitle>{typeTitles[notification.notification_type]}</NotificationTitle>
      <Originator>{notification.originator_name}</Originator>
      <Date>{relativeDate(notification.created_at)}</Date>
    </Wrapper>
  );
}

const QuestionIcon = styled(QuestionMarkIcon)`
  width: 12px;
  height: 12px;
`;

const Date = styled.div`
  margin: 0px;
  color: rgb(104, 112, 118);
  font-size: 10px;
  /* line-height: 1.3; */
  grid-area: time;
  justify-self: end;
  align-self: end;
  padding-bottom: 2px;
`;

const NotificationTitle = styled(Title)`
  grid-area: title;
`;

const typeColors = {
  confirm: "green",
  reject: "red",
  delete: "red",
  reschedule_confirm: "green",
  reschedule_reject: "red",
  reschedule_request: "violet",
};

const NotificationIcon = styled.div`
  grid-area: icon;
  width: 20px;
  height: 20px;
  background-color: var(--${(props) => typeColors[props.type]}2);
  color: var(--${(props) => typeColors[props.type]}11);
  box-shadow: inset 0 0 0 1px var(--${(props) => typeColors[props.type]}7);
  border-radius: 100%;
  justify-content: center;
  align-content: center;
  display: grid;
`;

const Originator = styled.div`
  margin: 0px;
  color: rgb(104, 112, 118);
  font-size: 13px;
  /* line-height: 1.; */
  grid-area: originator;
  align-self: end;
`;

const Wrapper = styled.div`
  background-color: white;
  /* border: 1px solid var(--blackA7); */
  /* border-radius: 6px; */
  /* width: 400px; */
  width: 100%;
  --shadow-color: 176deg 27% 46%;
  /* box-shadow: 0.5px 0.6px 0.9px hsl(var(--shadow-color) / 0.34),
    0.9px 1px 1.5px -1.2px hsl(var(--shadow-color) / 0.34),
    2.1px 2.4px 3.6px -2.5px hsl(var(--shadow-color) / 0.34); */
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  position: relative;
  display: grid;
  grid-template-areas: "icon title title" "icon originator time";
  grid-template-columns: 1fr 5fr 5fr;
  column-gap: 15px;
  align-items: center;
  border-top: 1px solid var(--blackA7);
  /* margin: 8px; */
`;
