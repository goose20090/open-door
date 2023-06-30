import React, { useContext } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Title, Time, Status } from "../../assets/AppointmentCapsuleStyles";
import { formatRecurringTime } from "../../helpers/formatRecurringTime";
import { formatSingleDate } from "../../helpers/formatSingleDate";
import { Cross2Icon } from "@radix-ui/react-icons";
import { PendingOptionsButtons } from "./AppointmentActions/PendingOptionsButtons";
import Options from "./AppointmentActions/OptionsPopover";
import OptionsPopover from "./AppointmentActions/OptionsPopover";
import { Wrapper } from "../../assets/NewAppointmentStyles";
import { UserContext } from "../../context/user";

const integerToWeekday = (day) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day];
};

export default function NewAppointmentCapsule({ appointment }) {
  // getting variables
  const { user } = useContext(UserContext);
  const { status, rescheduled_by, recurring, start_time, week_day, date, therapist, client } =
    appointment;

  // Creating booleans to check which options to display
  const notCreatedByCurrentUser = user.user_type.toLowerCase() === appointment.created_by;
  const notRescheduledByCurrentUser = user.user_type.toLowerCase() === appointment.rescheduled_by;

  // rendering correct info
  const name = user.user_type === "Client" ? therapist.name : client.name;
  const time = recurring
    ? formatRecurringTime(start_time, week_day)
    : formatSingleDate(start_time, date);

  return (
    <Wrapper status={!!rescheduled_by ? "reschedule" : ""}>
      <div>
        <Title>{name}</Title>
        <Time>{time}</Time>
      </div>
      <Status status={status} as={"div"}>
        {status}
      </Status>
      {isRescheduled && <Status status={"reschedule"}>reschedule</Status>}
      {status === "pending" && notCreatedByCurrentUser && notRescheduledByCurrentUser ? (
        <PendingOptionsButtons appointment={appointment} />
      ) : (
        <OptionsPopover appointment={appointment} />
      )}
    </Wrapper>
  );
}
