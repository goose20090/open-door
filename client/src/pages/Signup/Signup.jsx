/** @format */

import React from "react";
import SignupForm from "./SignupForm";
import { AuthWrapper } from "../Login/Login";

function Signup() {
  return (
    <AuthWrapper>
      <h2>Signup Page</h2>
      <SignupForm />
    </AuthWrapper>
  );
}

export default Signup;
