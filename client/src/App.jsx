/** @format */

import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import GlobalStyles from "./assets/GlobalStyles.js";
import styled from "styled-components";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ClientHub from "./pages/ClientHub/ClientHub";
import About from "./pages/About/About";
import { useAuthQuery } from "./hooks/useAuthQuery";
import TherapistsHub from "./pages/TherapistsHub/TherapistsHub";
import * as Toast from "@radix-ui/react-toast";
import Home from "./pages/Home/Home";

function App() {
  useAuthQuery();
  return (
    <Wrapper>
      <GlobalStyles />
      <NavBar />
      <StyledSwitch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/appointments">
          <ClientHub />
        </Route>
        <Route path="/therapist-appointments">
          <TherapistsHub />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </StyledSwitch>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: lightblue;
`;

const StyledSwitch = styled(Switch)`
  height: 100%;
`;
export default App;
