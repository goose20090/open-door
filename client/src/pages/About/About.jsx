import React from "react";
import styled from "styled-components";
import { useTherapists } from "../../hooks/useTherapists";
import { v4 as key } from "uuid";
import { ReactComponent as Profile1 } from "../../assets/undraw_profile_pic_re_iwgo.svg";

export default function About() {
  const { data: therapists, isSuccess, isLoading } = useTherapists();

  if (isSuccess) {
    console.log(therapists);
  }
  return (
    <Wrapper>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        therapists.map((therapist) => (
          <TherapistContainer key={key()}>
            <ProfileContainer>
              <StyledProfile />
            </ProfileContainer>
            <NameContainer>
              <h4>{therapist.name}</h4>
            </NameContainer>
          </TherapistContainer>
        ))
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  padding-left: 32px;
  padding-right: 32px;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  grid-template-rows: repeat(
    auto-fill,
    minmax(250px, 1fr)
  ); // This will create flexible grid columns
  grid-gap: 20px; // Optional: provide some spacing between the grid items
`;

const TherapistContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr; // Adjust this to control the size of the image vs the name
  grid-area: ;
`;

const StyledProfile = styled(Profile1)`
  height: 150px;
`;

const ProfileContainer = styled.div`
  height: 250px;
  // Any additional styles for the image container go here
`;

const NameContainer = styled.div`
  // Any additional styles for the name container go here
`;
