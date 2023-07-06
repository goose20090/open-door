import React, { useContext } from "react";
import styled from "styled-components";

export default function AppointmentsLayout({
  recurringContent,
  singleContent,
  contentType = "appointments",
}) {
  return (
    <Grid>
      <RegularHeaderWrapper>
        <Heading>Recurring</Heading>
      </RegularHeaderWrapper>
      <RegularAppointments>
        {!recurringContent || recurringContent.length > 0 ? (
          recurringContent
        ) : (
          <Placeholder>You have no recurring {contentType}</Placeholder>
        )}
      </RegularAppointments>
      <SingleHeaderWrapper>
        <Heading>One-off</Heading>
      </SingleHeaderWrapper>
      <SingleAppointments>
        {!singleContent || singleContent.length > 0 ? (
          singleContent
        ) : (
          <Placeholder>You have no single {contentType}</Placeholder>
        )}
      </SingleAppointments>
    </Grid>
  );
}

const Placeholder = styled.p`
  margin: 0px;
  color: rgb(104, 112, 118);
  font-size: 0.9rem;
  padding-left: 8px;
  line-height: 1.3;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2.5rem 1fr;
  gap: 1px;
  position: relative;
  height: 100%;
  background-color: var(--blackA7);
  grid-template-areas:
    "heading1 heading2"
    "regular single";
`;

const RegularAppointments = styled.div`
  background-color: hsla(0, 0%, 100%, 1);
  grid-area: regular;
  overflow: auto;
  padding: 8px;
`;

const SingleAppointments = styled.div`
  background-color: white;
  grid-area: single;
  padding: 8px;
`;

const Header = styled.header`
  background-color: white;
  padding: 6px;
  padding-left: 16px;
  margin-bottom: -1px;
  padding-top: 10px;
`;

const RegularHeaderWrapper = styled(Header)`
  grid-area: heading1;
`;
const SingleHeaderWrapper = styled(Header)`
  grid-area: heading2;
`;

const Heading = styled.h3``;
