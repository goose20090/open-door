import React, { useContext } from "react";
import { TherapistWeeklyAv } from "./Tabs/TherapistWeeklyAv";
import { useAuthQuery } from "../../hooks/useAuthQuery";
import { UserContext } from "../../context/user";
import * as Tabs from "@radix-ui/react-tabs";
import styled from "styled-components";
import AppointmentRequests from "./Tabs/AppointmentRequests";
import DateRangePickerComponent from "./DateRangePicker";
import { Redirect } from "react-router-dom";
import TherapistAppointments from "./Tabs/TherapistAppointments";
import { useToast } from "../../hooks/useToast";
import { useHistory } from "react-router-dom";

function TherapistsHub() {
  const { isLoading } = useAuthQuery(false);
  const { user } = useContext(UserContext);
  const { addToast } = useToast();
  const history = useHistory();
  if (isLoading) return <p>Loading...</p>;
  if (!user || user.user_type === "Client") {
    history.push("/");
    addToast("unauthorised");
    return null;
  }
  return (
    <Wrapper>
      <TabsRoot orientation="vertical" defaultValue="tab2">
        <HubGrid>
          <OrientationRow>
            <TabsList>
              <TabsTrigger value="tab1">Appointment Requests</TabsTrigger>
              <TabsTrigger value="tab2">Appointments</TabsTrigger>
              <TabsTrigger value="tab3">Weekly Availability</TabsTrigger>
            </TabsList>
          </OrientationRow>
          <Content>
            <TabsContent value="tab1">
              <AppointmentRequests />
            </TabsContent>
            <TabsContent value="tab2">
              <TherapistAppointments />
            </TabsContent>
            <TabsContent value="tab3">
              <TherapistWeeklyAv />
            </TabsContent>
          </Content>
        </HubGrid>
      </TabsRoot>
    </Wrapper>
  );
}

export default TherapistsHub;

const Wrapper = styled.main`
  height: 80%;
  position: relative;
`;

const HubGrid = styled.div`
  --shadow-color: 176deg 27% 46%;
  box-shadow: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.36),
    0.8px 1.6px 2px -0.8px hsl(var(--shadow-color) / 0.36),
    2.1px 4.1px 5.2px -1.7px hsl(var(--shadow-color) / 0.36),
    5px 10px 12.6px -2.5px hsl(var(--shadow-color) / 0.36);

  position: absolute;
  overflow: auto;
  /* border: 2px solid black; */
  border: 1px solid var(--blackA7);
  border-radius: 25px;
  top: 25px;
  left: 10%;
  right: 10%;
  bottom: 0;
  /* height: 80%; */
  /* margin-top: 5%; */
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 2.75rem 1fr;
  grid-template-areas:
    "orientation orientation orientation"
    "content content content";
  gap: 1px;
`;

const OrientationRow = styled.div`
  grid-area: orientation;
`;

const Content = styled.div`
  grid-area: content;
  overflow: auto;
  height: 100%;
`;

const TabsContent = styled(Tabs.Content)`
  height: 100%;
  background-color: white;
`;

const TabsRoot = styled(Tabs.Root)`
  /* padding: 1px; */
  /* height: 80%; */
  /* position: relative; */
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
  border-bottom: 1px solid var(--blackA7);

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
    /* box-shadow: inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor; */
    border-bottom-color: var(--violet11);
  }
`;

const TabsList = styled(Tabs.List)`
  display: flex;
  /* width: 300px; */
  box-shadow: 0 2px 10px var(--blackA4);
`;
