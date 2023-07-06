import React, { useContext, useState } from "react";
import styled from "styled-components";
import { BellIcon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";
import { RoundIconButton } from "../assets/Buttons";
import { UserContext } from "../context/user";
import { PopoverContent } from "./RadixWrappers/PopoverWrapper";
import Notification from "./Notification";
import { Time } from "../assets/AppointmentCapsuleStyles";
import { v4 as key } from "uuid";
import { useReadNotifcationsMutation } from "../hooks/useReadNotificationsMutation";

export default function NotificationsPopup() {
  const { user } = useContext(UserContext);
  const { notifications } = user;

  const [initialOpen, setInitialOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(user.unread);
  const readNotifications = useReadNotifcationsMutation(user);

  function handleChange() {
    if (!initialOpen) {
      setInitialOpen(true);
      if (unread > 0) {
        readNotifications.mutate();
        setUnread(0);
      }
    }
    setOpen(!open);
  }

  return (
    <Popover.Root open={open} onOpenChange={handleChange}>
      <Popover.Trigger asChild>
        <div style={{ position: "relative" }}>
          <BellButton>
            <Bell />
          </BellButton>
          {unread > 0 ? (
            <Count>
              <Number>{unread}</Number>
            </Count>
          ) : null}
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <NotificationsPopupContent>
          <Time>
            {user.notifications.length > 0 ? "While you were away..." : "No new notifications"}
          </Time>
          {notifications.map((not) => (
            <StyledNotification notification={not} key={key()} />
          ))}

          <PopoverArrow />
        </NotificationsPopupContent>
      </Popover.Portal>
    </Popover.Root>
  );
}

const PopoverArrow = styled(Popover.Arrow)`
  fill: white;
  /* border: 1px solid black; */
`;

const StyledNotification = styled(Notification)`
  &:first-of-type {
    border-top: none;
  }
`;
const PopoverRoot = styled(Popover.Root)``;

const BellButton = styled(RoundIconButton)`
  border: 0.75px solid var(--blackA7);
  background-color: white;
  --shadow-color: 176deg 27% 46%;
  box-shadow: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),
    0.4px 0.8px 1px -1.2px hsl(var(--shadow-color) / 0.34),
    1px 2px 2.5px -2.5px hsl(var(--shadow-color) / 0.34);
`;

const Bell = styled(BellIcon)``;

const NotificationsPopupContent = styled(Popover.Content)`
  padding: 20px;
  width: 300px;

  border-radius: 6px;
  padding: 10px;
  padding-top: 15px;
  width: fit-content;
  background-color: white;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  /* will-change: transform, opacity; */

  max-height: 400px;
  overflow: auto;
  > :nth-child(2) {
    border-top: none;
  }
`;

const Count = styled.div`
  position: absolute;
  display: grid;
  height: 0.9rem;
  width: 0.9rem;
  background-color: red;
  color: white;
  border-radius: 100%;
  top: -6px;
  right: -2px;
`;

const Number = styled.span`
  justify-self: center;
  align-self: center;
  font-size: 0.6rem;
  font-weight: bold;
`;
