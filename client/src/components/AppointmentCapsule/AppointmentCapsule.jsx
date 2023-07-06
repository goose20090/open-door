import React, { useContext } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Title, Time, Status } from "../../assets/AppointmentCapsuleStyles";
import { formatRecurringTime } from "../../helpers/formatRecurringTime";
import { formatSingleDate } from "../../helpers/formatSingleDate";
import { Cross2Icon } from "@radix-ui/react-icons";
import { PendingOptionsButtons } from "./AppointmentActions/PendingOptionsButtons";
import OptionsPopover from "./AppointmentActions/OptionsPopover";
import { Wrapper } from "../../assets/NewAppointmentStyles";
import { UserContext } from "../../context/user";

const integerToWeekday = (day) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day];
};

export default function AppointmentCapsule({ appointment }) {
  // getting variables
  const { user } = useContext(UserContext);
  const { status, rescheduled_by, recurring, start_time, week_day, date, therapist, client } =
    appointment;

  // Creating booleans to check which options to display
  const userIsClient = user.user_type === "Client";
  const rescheduledByCurrentUser = user.user_type.toLowerCase() === appointment.rescheduled_by;
  const isRescheduled = !!rescheduled_by;

  // rendering correct info
  const name = user.user_type === "Client" ? therapist.name : client.name;
  const time = recurring
    ? formatRecurringTime(start_time, week_day)
    : formatSingleDate(start_time, date);

  function renderCorrectOptions() {
    if (isRescheduled) {
      if (rescheduledByCurrentUser) {
        return <OptionsPopover appointment={appointment} />;
      } else return <PendingOptionsButtons appointment={appointment} />;
    } else if (status === "pending") {
      if (userIsClient) {
        return <OptionsPopover appointment={appointment} />;
      } else return <PendingOptionsButtons appointment={appointment} />;
    } else return <OptionsPopover appointment={appointment} />;
  }

  return (
    <Wrapper status={!!rescheduled_by ? "reschedule" : ""}>
      <div>
        <Title>{name}</Title>
        <Time>{time}</Time>
      </div>
      <Status status={status} as={"div"}>
        {status}
      </Status>
      {!!rescheduled_by && <Status status={"reschedule"}>reschedule</Status>}
      {renderCorrectOptions()}
    </Wrapper>
  );
}
