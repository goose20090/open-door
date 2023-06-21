import React, { useContext } from "react";
import { TherapistScheduler } from "./TherapistScheduler";
import { useAuthQuery } from "../../hooks/useAuthQuery";
import { UserContext } from "../../context/user";
import * as Tabs from "@radix-ui/react-tabs";
import styled from "styled-components";
import AppointmentRequests from "./AppointmentRequests";
import DateRangePickerComponent from "./DateRangePicker";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function TherapistsHub() {
  const { isLoading } = useAuthQuery();
  const { user } = useContext(UserContext);
  if (isLoading) return <p>Loading...</p>;
  if (!user) return <Redirect to="/" />;
  return (
    <TabsRoot orientation="vertical" defaultValue="tab2">
      <HubGrid>
        <OrientationRow>
          <TabsList>
            <TabsTrigger value="tab1">Appointment Requests</TabsTrigger>
            <TabsTrigger value="tab2">Weekly Availability</TabsTrigger>
            <TabsTrigger value="tab3">Book a Holiday</TabsTrigger>
          </TabsList>
        </OrientationRow>
        <Content>
          <Tabs.Content value="tab1">
            <AppointmentRequests />
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <TherapistScheduler />
          </Tabs.Content>
          <Tabs.Content value="tab3">
            <DateRangePickerComponent />
          </Tabs.Content>
        </Content>
      </HubGrid>
    </TabsRoot>
  );
}

export default TherapistsHub;

const HubGrid = styled.div`
  --shadow-color: 176deg 27% 46%;
  box-shadow: 0.5px 0.6px 0.9px hsl(var(--shadow-color) / 0.36),
    1.7px 2px 3px -0.8px hsl(var(--shadow-color) / 0.36),
    4.4px 5px 7.5px -1.7px hsl(var(--shadow-color) / 0.36),
    10.6px 12.1px 18.1px -2.5px hsl(var(--shadow-color) / 0.36);

  position: absolute;
  overflow: hidden;
  /* border: 2px solid black; */
  border-radius: 25px;
  top: 25px;
  left: 10%;
  right: 10%;
  bottom: 10%;
  /* height: 100%; */
  background-color: gray;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 2.75rem 1fr;
  grid-template-areas:
    "orientation orientation orientation"
    "content content content";
  gap: 2px;
`;

const OrientationRow = styled.div`
  grid-area: orientation;
  background-color: lightblue;
`;

const Content = styled.div`
  grid-area: content;
  background-color: lightblue;
  overflow: auto;
`;

const TabsRoot = styled(Tabs.Root)`
  height: 80%;
  position: relative;
`;

const TabsTrigger = styled(Tabs.Trigger)`
  font-family: inherit;
  background-color: white;
  /* padding: 0 20px; */
  height: 45px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  line-height: 1;
  color: var(--mauve11);
  user-select: none;
  border-radius: 0;

  &:first-of-type {
    border-top-left-radius: 25px;
  }

  &:last-of-type {
    border-top-right-radius: 25px;
  }

  &:hover {
    color: var(--violet11);
  }
  &[data-state="active"] {
    color: var(--violet11);
    box-shadow: inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor;
  }
`;

const TabsList = styled(Tabs.List)`
  display: flex;
  /* width: 300px; */
  box-shadow: 0 2px 10px var(--blackA4);
`;
