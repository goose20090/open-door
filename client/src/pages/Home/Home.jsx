import React from "react";
import styled from "styled-components";
import { ReactComponent as FlowerSvg } from "../../assets/undraw_blooming_re_2kc4.svg";
import { ReactComponent as BlurryGradient } from "../../assets/blurry-gradient-haikei.svg";

function Home() {
  return (
    <HomeWrapper>
      <Wrapper>
        <FlowerToon />
        <Header>Life is an adventure to be lived.</Header>
      </Wrapper>
      {/* <Gradient></Gradient> */}
      {/* <TopWrapper>
        <FlowerToon />

        <Copy>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Copy>
      </TopWrapper> */}
      {/* <FullBleed>
        <Landscape src="https://images.unsplash.com/photo-1507537362848-9c7e70b7b5c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" />
      </FullBleed>
      <h1>We're here to help.</h1>
      <FullBleed>
        <Landscape src="https://images.unsplash.com/photo-1493836512294-502baa1986e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1490&q=80" />
      </FullBleed> */}
      {/* <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p> */}
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

const Gradient = styled(BlurryGradient)`
  width: 100%;
  height: fit-content;
  object-fit: cover;
  /* margin-top: 20%; */
  border-radius: 16px;
  position: absolute;
  z-index: 1;
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
