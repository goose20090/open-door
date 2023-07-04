import React, { useContext } from "react";
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
  const readNotifications = useReadNotifcationsMutation(user);
  return (
    <Popover.Root onOpenChange={() => readNotifications.mutate()}>
      <Popover.Trigger asChild>
        <div style={{ position: "relative" }}>
          <BellButton>
            <Bell />
          </BellButton>
          {notifications ? (
            <Count>
              <Number>{notifications.length}</Number>
            </Count>
          ) : null}
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <NotificationsPopupContent>
          <Time>While you were away...</Time>
          {notifications.map((not) => (
            <StyledNotification notification={not} key={key()} />
          ))}

          <Popover.Arrow />
        </NotificationsPopupContent>
      </Popover.Portal>
    </Popover.Root>
  );
}

const StyledNotification = styled(Notification)`
  &:first-of-type {
    border-top: none;
  }
`;
const PopoverRoot = styled(Popover.Root)``;

const BellButton = styled(RoundIconButton)`
  border: 0.75px solid var(--blackA7);
  --shadow-color: 176deg 27% 46%;
  box-shadow: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),
    0.4px 0.8px 1px -1.2px hsl(var(--shadow-color) / 0.34),
    1px 2px 2.5px -2.5px hsl(var(--shadow-color) / 0.34);
`;

const Bell = styled(BellIcon)``;

const NotificationsPopupContent = styled(PopoverContent)`
  padding: 20px;
  width: 300px;
  height: 400px;
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
