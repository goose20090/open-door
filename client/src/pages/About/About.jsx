import React from "react";
import styled from "styled-components";
import { useTherapists } from "../../hooks/useTherapists";
import { v4 as key } from "uuid";
import { ReactComponent as Profile1 } from "../../assets/undraw_profile_pic_re_iwgo.svg";
import { ReactComponent as Profile2 } from "../../assets/undraw_male_avatar_g98d.svg";
import { ReactComponent as Profile3 } from "../../assets/undraw_female_avatar_efig.svg";
import { ReactComponent as Profile4 } from "../../assets/undraw_coffee_time_45em.svg";
import { ReactComponent as Profile5 } from "../../assets/undraw_drink_coffee_av1x.svg";
import { Time, Title } from "../../assets/AppointmentCapsuleStyles";
import ErrorList from "../../components/Errors/ErrorList";

const profiles = [
  styled(Profile1)`
    height: 150px;
  `,
  styled(Profile2)`
    height: 150px;
  `,
  styled(Profile3)`
    height: 150px;
  `,
  styled(Profile4)`
    height: 150px;
  `,
  styled(Profile5)`
    height: 150px;
  `,
];

export default function About() {
  const { data: therapists, isSuccess, isLoading, isError } = useTherapists();

  if (isError) {
    return (
      <ErrorList errors={["There's been an error, please refresh or try again at another time"]} />
    );
  }
  return (
    <>
      <Heading>Our team</Heading>
      <Wrapper>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          therapists.map((therapist, index) => {
            const Profile = profiles[index % profiles.length];
            return (
              <TherapistContainer key={key()}>
                <ProfileContainer>
                  <Profile />
                </ProfileContainer>
                <TextContainer>
                  <NameContainer>
                    <Name>{therapist.name}</Name>
                  </NameContainer>
                  <BiographyContainer>
                    <Bio>{therapist.biography}</Bio>
                  </BiographyContainer>
                </TextContainer>
              </TherapistContainer>
            );
          })
        )}
      </Wrapper>
    </>
  );
}

const TextContainer = styled.div`
  grid-area: text;
  margin-top: 4%;
`;

const Bio = styled(Time)`
  font-size 0.9rem;
`;

const Name = styled(Title)`
  font-size: 1.2rem;
  padding-left: 8px;
`;

const Heading = styled.h1`
  margin-top: 5%;
  text-align: center;
  margin-right: 33%;
`;
const BiographyContainer = styled.div`
  grid-area: biography;
  padding: 0 8px;
  /* justify-content: center; */
`;
const Wrapper = styled.div`
  margin-top: 5%;
  display: grid;
  padding-left: 32px;
  padding-right: 32px;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  grid-template-rows: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
`;

const TherapistContainer = styled.div`
  background-color: hsla(0, 0%, 100%, 0.6);
  border-radius: 16px;
  display: grid;
  padding: 8px;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1.5rem 1fr;
  grid-template-areas:
    "avatar text"
    "avatar text";
`;

const ProfileContainer = styled.div`
  height: 250px;
  grid-area: avatar;
`;

const NameContainer = styled.div`
  grid-area: name;
`;
