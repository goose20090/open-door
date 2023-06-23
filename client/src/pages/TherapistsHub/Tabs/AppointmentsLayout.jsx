import React, { useContext } from "react";
import styled from "styled-components";

export default function AppointmentsLayout({ recurringContent, singleContent, contentType }) {
  return (
    <Grid>
      <RegularHeaderWrapper>
        <Heading>Recurring Appointments</Heading>
      </RegularHeaderWrapper>
      <RegularAppointments>
        {recurringContent.length > 0 ? (
          recurringContent
        ) : (
          <p>You have no recurring {contentType}</p>
        )}
      </RegularAppointments>
      <SingleHeaderWrapper>
        <Heading>One-off</Heading>
      </SingleHeaderWrapper>
      <SingleAppointments>
        {singleContent.length > 0 ? singleContent : <p>You have no single {contentType}</p>}
      </SingleAppointments>
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2.5rem 1fr;
  gap: 1px;
  position: relative;
  height: 100%;
  background-color: black;
  grid-template-areas:
    "heading1 heading2"
    "regular single";
`;

const RegularAppointments = styled.div`
  background-color: lightblue;
  grid-area: regular;
  overflow: auto;
  padding: 8px;
`;

const SingleAppointments = styled.div`
  background-color: lightblue;
  grid-area: single;
  padding: 8px;
`;

const Header = styled.header`
  background-color: lightblue;
  padding: 6px;
  margin-bottom: -1px;
`;

const RegularHeaderWrapper = styled(Header)`
  grid-area: heading1;
`;
const SingleHeaderWrapper = styled(Header)`
  grid-area: heading2;
`;

const Heading = styled.h3``;
