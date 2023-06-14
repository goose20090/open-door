import { Cross2Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { useQuery } from "@tanstack/react-query";
import fetchWithError from "../../helpers/fetchWithError";
import { useState } from "react";
import DatePickerComponent from "../../components/DatePickerComponent";
import { useTherapists } from "../../helpers/useTherapists";
import TherapistSelect from "../../components/TherapistSelect";
import TimeSelect from "../../components/TimeSelect";
import {
  FormWrapper,
  HeaderWrapper,
  DateSelectWrapper,
  TimeSubmitWrapper,
  GreenButton,
  IconButton,
  DialogTitle,
  DialogDescription,
  DatePickerWrapper,
} from "../../assets/NewAppointmentStyles";

export default function NewAppointmentForm() {
  const testTimeOptArr = ["1", "2", "3", "4", "5"];

  const selectPlaceHolder = "please select a therapist";

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [weekDay, setWeekDay] = useState("wednesday");

  const [therapistSelected, setTherapistSelected] = useState(false);

  const [therapist, setTherapist] = useState(null);

  const { isLoading, data: therapists } = useTherapists();

  function handleChange(e) {
    const therapistObj = therapists.find(
      (therapist) => therapist.name == e.target.value
    );
    setTherapist(therapistObj);
    setTherapistSelected(e.target.value !== selectPlaceHolder);
  }

  return (
    <FormWrapper>
      <HeaderWrapper>
        <DialogTitle>Book a New Appointment</DialogTitle>
        <DialogDescription className="DialogDescription">
          Select a therapist and pick an available time.
        </DialogDescription>
      </HeaderWrapper>
      <DateSelectWrapper>
        <TherapistSelect
          isLoading={isLoading}
          therapists={therapists}
          setTherapist={setTherapist}
          handleChange={handleChange}
          selectPlaceHolder={selectPlaceHolder}
        />
        <DatePickerWrapper>
          <DatePickerComponent
            therapistSelected={therapistSelected}
            startDate={selectedDate}
            setStartDate={setSelectedDate}
            setWeekDay={setWeekDay}
          />
        </DatePickerWrapper>
      </DateSelectWrapper>
      <TimeSubmitWrapper>
        <TimeSelect
          testTimeOptArr={testTimeOptArr}
          therapist={therapist}
          therapistSelected={therapistSelected}
          weekDay={weekDay}
        />
        <Dialog.Close asChild>
          <GreenButton>Request Appointment</GreenButton>
        </Dialog.Close>
      </TimeSubmitWrapper>
      <Dialog.Close asChild>
        <IconButton className="IconButton" aria-label="Close">
          <Cross2Icon />
        </IconButton>
      </Dialog.Close>
    </FormWrapper>
  );
}
