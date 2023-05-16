/** @format */

import { useState } from "react";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import GlobalStyles from "./assets/GlobalStyles.js";
import styled from "styled-components";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Wrapper>
      <GlobalStyles />
      <NavBar />
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
