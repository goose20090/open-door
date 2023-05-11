/** @format */

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import NavBar from "./components/NavBar";
// import "./assets/App.css";
import GlobalStyles from "./assets/GlobalStyles.js";
import styled from "styled-components";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Wrapper>
      <GlobalStyles />
      <NavBar />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: lightblue;
`;

export default App;
