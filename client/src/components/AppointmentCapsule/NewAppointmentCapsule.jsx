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
  const { user } = useContext(UserContext);
  const { status } = appointment;
  console.log(!!appointment.rescheduled_by);
  return (
    <Wrapper status={!!appointment.rescheduled_by ? "reschedule" : ""}>
      <div>
        <Title>
          {user.user_type === "Client" ? appointment.therapist.name : appointment.client.name}
        </Title>
        {appointment.recurring ? (
          <Time>{formatRecurringTime(appointment.start_time, appointment.week_day)}</Time>
        ) : (
          <Time>{formatSingleDate(appointment.start_time, appointment.date)}</Time>
        )}
      </div>
      <Status status={status} as={"div"}>
        {status}
      </Status>
      {!!appointment.rescheduled_by ? <Status status={"reschedule"}>reschedule</Status> : null}
      {status === "pending" ? (
        <PendingOptionsButtons appointment={appointment} />
      ) : (
        <OptionsPopover appointment={appointment} />
      )}
    </Wrapper>
  );
}
