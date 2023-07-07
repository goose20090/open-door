import React from "react";
import styled from "styled-components";
import { ReactComponent as FlowerSvg } from "../../assets/undraw_blooming_re_2kc4.svg";

function Home() {
  return (
    <HomeWrapper>
      <Wrapper>
        <FlowerToon />
        <Header>Life is an adventure to be lived.</Header>
      </Wrapper>
    </HomeWrapper>
  );
}

const Header = styled.h1`
  align-self: end;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  /* height: fit-content; */
  /* height: 340px; */
  margin-top: 5%;
  /* overflow: hidden; */
`;

const Copy = styled.p`
  grid-area: text;
`;

const HomeWrapper = styled.main`
  height: 100%;
  /* padding-top: 50px; */
  /* display: grid;
  grid-template-columns: 1fr min(60ch, 100%) 1fr;

  > * {
    grid-column: 2;
  } */
`;

const FlowerToon = styled(FlowerSvg)`
  height: 300px;
  /* position: absolute;
  height: 300px;
  z-index: 2;
  top: 20%;
  left: 20%;
  width: fit-content; */
  /* right: 0; */
`;

const TopWrapper = styled.div`
  /* display: grid; */
  /* grid-template-columns: 1fr 1fr;
  grid-template-areas: "svg text"; */
`;
const FullBleed = styled.div`
  grid-column: 1/-1;
  /* background-color: white; */
`;

const Landscape = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;
export default Home;
