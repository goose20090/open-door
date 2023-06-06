/** @format */

import { useContext, useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import GlobalStyles from "./assets/GlobalStyles.js";
import styled from "styled-components";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import { UserContext } from "./context/user";
import { useQuery } from "@tanstack/react-query";
import fetchWithError from "./helpers/fetchWithError";
import BookingHub from "./pages/BookingHub/BookingHub";

function App() {
  const { user, setUser } = useContext(UserContext);

  function checkSession() {
    return fetchWithError("api/me");
  }

  const authQuery = useQuery(["user", "authorisation"], checkSession, {
    onSuccess: (r) => {
      setUser(r);
    },
    retry: 0,
  });

  return (
    <Wrapper>
      <GlobalStyles />
      <NavBar user={user} setUser={setUser} />
      <Switch>
        <Route path="/about">
          <h1>About page</h1>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/bookings">
          <BookingHub />
        </Route>
        <Route path="/">
          <h1>Home</h1>
        </Route>
      </Switch>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: lightblue;
`;

export default App;
