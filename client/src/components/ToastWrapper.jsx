import * as Toast from "@radix-ui/react-toast";
import styled, { keyframes } from "styled-components";
import { useToast } from "../hooks/useToast";
import { formatDetails } from "../helpers/formatDetails";
import { useContext } from "react";
import { UserContext } from "../context/user";
import { Button } from "../assets/Buttons";

export function ToastWrapper() {
  const { user } = useContext(UserContext);
  const { toasts, removeToast } = useToast();
  const actionTitles = {
    create: "Appointment Requested",
    alter: "Appointment Request Changed",
    reschedule: "Reschedule Requested",
    delete: "Appointment Deleted",
    reject: "Appointment Rejected",
    confirm: "Appointment Confirmed",
    rescheduleCancel: "Reschedule Request Cancelled",
    rescheduleReject: "Reschedule Request Denied",
    rescheduleConfirm: "Reschedule Confirmed",
    scheduleSuccess: "Schedule Updated",
    error: "Error",
    unauthorised: "Unauthorised",
  };

  function renderTitle(toast) {
    const { action, appointment } = toast;
    if (action === "notificationConfirm") {
      return `${appointment.therapist.name} confirmed your appointment request`;
    }
    if (action === "notificationReject") {
      return `${appointment.therapist.name} rejected your appointment request`;
    }
    if (action === "reschedule" && appointment.status === "pending") {
      return "Reschedule Request Updated";
    }
    if (action === "delete" && appointment.status === "pending") {
      return "Appointment Request Deleted";
    }
    return actionTitles[toast.action];
  }

  function renderDescription(toast) {
    const { appointment, newAppointment, action } = toast;
    if (action === "unauthorised") {
      return "Please log in to view, book and alter appointments";
    }
    if (action === "scheduleSuccess") {
      return "Clients will not be able to book outside the times you've selected.";
    }

    if (action === "error") {
      return "There was an error and this action may not have completed. Please try again";
    }

    const otherPartyName =
      user.user_type === "Client" ? appointment.therapist.name : appointment.client.name;
    const details = formatDetails(appointment);
    const newDetails = newAppointment ? formatDetails(newAppointment) : null;
    const fullDetails = `${details}, with ${otherPartyName}`;
    if (action === "rescheduleCancel" || action === "rescheduleReject") {
      return (
        <>
          <b>Appointment rolled back to original time:</b>
          <br />
          {fullDetails}
        </>
      );
    }

    if (
      action === "create" ||
      action === "confirm" ||
      action === "reject" ||
      action === "rollback" ||
      action === "rescheduleConfirm"
    ) {
      return fullDetails;
    }
    if (action === "alter" || action === "reschedule") {
      return (
        <>
          <b>{otherPartyName}</b>
          <br />
          <b>From: </b>
          {details}
          <br />
          <b>To: </b>
          {newDetails}
        </>
      );
    }
    if (action === "notificationConfirm" || action === "notificationReject") {
      return details;
    }

    if (action === "delete") {
      return fullDetails;
    }
  }

  return (
    <>
      {toasts.map((toast) => (
        <Root key={toast.id} open={true} onOpenChange={() => removeToast(toast.id)}>
          <Title>{renderTitle(toast)}</Title>
          <Description>{renderDescription(toast)}</Description>
          <Confirmation asChild altText="confirm button">
            <ConfirmButton
              onClick={() => removeToast(toast.id)}
              status={
                toast.action === "reschedule"
                  ? "reschedule"
                  : toast.action === "delete"
                  ? "delete"
                  : toast.status
              }
            >
              Ok
            </ConfirmButton>
          </Confirmation>
        </Root>
      ))}
      <Viewport />
    </>
  );
}

const statusColors = {
  confirmed: {
    backgroundColor: "--green2",
    color: "--green11",
    boxShadow: "--green7",
  },
  pending: {
    backgroundColor: "--amber2",
    color: "--amber11",
    boxShadow: "--amber7",
  },
  reschedule: {
    backgroundColor: "--violet2",
    color: "--violet11",
    boxShadow: "--violet7",
  },
  rejected: {
    backgroundColor: "--red2",
    color: "--red11",
    boxShadow: "--red7",
  },
  default: {
    backgroundColor: "--green2",
    color: "--green11",
    boxShadow: "--green7",
  },
  delete: {
    backgroundColor: "--red2",
    color: "--red11",
    boxShadow: "--red7",
  },
};

const ConfirmButton = styled(Button)`
  margin-left: auto;
  grid-area: status;
  align-self: center;
  justify-self: center;
  font-size: 12px;
  padding: 0 10px;
  line-height: 25px;
  height: 25px;
  background-color: var(
    ${({ status }) => statusColors[status]?.backgroundColor || statusColors.default.backgroundColor}
  );
  color: var(${({ status }) => statusColors[status]?.color || statusColors.default.color});
  box-shadow: inset 0 0 0 1px
    var(${({ status }) => statusColors[status]?.boxShadow || statusColors.default.boxShadow});
`;

const Title = styled(Toast.Title)`
  grid-area: title;
  margin-bottom: 5px;
  font-weight: 500;
  color: var(--blackA12);
  font-size: 15px;
`;

const Description = styled(Toast.Description)`
  grid-area: description;
  margin: 0;
  color: var(--blackA11);
  font-size: 13px;
  line-height: 1.3;
`;
const Details = styled.div`
  color: inherit;
  padding: 2px 0px;
`;

const NextStep = styled.div`
  padding: 2px 0px;
  color: var(--blackA12);
`;

const Confirmation = styled(Toast.Close)`
  grid-area: action;
`;

const Root = styled(Toast.Root)`
  --viewport-padding: 25px;
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  padding: 15px;
  display: grid;
  grid-template-areas: "title action" "description action";
  grid-template-columns: auto max-content;
  column-gap: 15px;
  align-items: center;
  &[data-state="open"] {
    animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  &[data-state="closed"] {
    animation: hide 100ms ease-in forwards;
  }
  &[data-swipe="move"] {
    transform: translateX(var(--radix-toast-swipe-move-x));
  }
  &[data-swipe="cancel"] {
    transform: translateX(0);
    transition: transform 200ms ease-out;
  }
  &[data-swipe="end"] {
    animation: swipeOut 100ms ease-out;
  }

  @keyframes hide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(calc(100% + 25px));
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(var(--radix-toast-swipe-end-x));
    }
    to {
      transform: translateX(calc(100% + var(--viewport-padding)));
    }
  }
`;

const Viewport = styled(Toast.Viewport)`
  --viewport-padding: 25px;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: var(--viewport-padding);
  gap: 10px;
  width: 390px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
`;
