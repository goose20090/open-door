import { Cross2Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import { useQuery, useIsFetching } from "@tanstack/react-query";
import fetchWithError from "../../helpers/fetchWithError";
import { useState } from "react";
import DatePickerComponent from "../../components/DatePickerComponent";
import { useTherapists } from "../../hooks/useTherapists";
import TherapistSelect from "../../components/TherapistSelect";
import BookingSubmitter from "../../components/BookingSubmitter";
import { getNextWorkingDay } from "../../helpers/getNextWorkingDay";
import { StyledUpdateIcon } from "../../assets/NewAppointmentStyles";
import { IconButton, GreenButton, Button } from "../../assets/Buttons";
import {
  FormWrapper,
  HeaderWrapper,
  DateSelectWrapper,
  BookingSubmitterWrapper,
  DialogTitle,
  DialogDescription,
  DatePickerWrapper,
} from "../../assets/NewAppointmentStyles";

export default function BookingDialogContent({ setOpen }) {
  const nextWorkingDay = getNextWorkingDay();
  const [therapistSelected, setTherapistSelected] = useState(false);
  const { isLoading, data: therapists } = useTherapists();
  const [currentTherapistId, setCurrentTherapistId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(nextWorkingDay);

  function handleChange(e) {
    setCurrentTherapistId(e.target.value);
    setTherapistSelected(e.target.value !== "please select a therapist");
  }

  const isFetching = useIsFetching(["therapist", "schedule"]);

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
          handleChange={handleChange}
        />
        <DatePickerWrapper>
          <DatePickerComponent
            therapistSelected={therapistSelected}
            startDate={selectedDate}
            setStartDate={setSelectedDate}
          />
        </DatePickerWrapper>
      </DateSelectWrapper>
      <BookingSubmitterWrapper>
        <BookingSubmitter
          currentTherapistId={currentTherapistId}
          therapistSelected={therapistSelected}
          nextWorkingDay={nextWorkingDay.getDay}
          selectedDate={selectedDate}
          setOpen={setOpen}
        />
      </BookingSubmitterWrapper>
      <Dialog.Close asChild>
        <IconButton className="IconButton" aria-label="Close">
          <Cross2Icon />
        </IconButton>
      </Dialog.Close>
      {isFetching ? <StyledUpdateIcon /> : null}
    </FormWrapper>
  );
}
