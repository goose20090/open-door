/** @format */

import React from "react";
import SignupForm from "./SignupForm";
import { AuthWrapper } from "../Login/Login";

function Signup() {
  return (
    <AuthWrapper>
      <SignupForm />
    </AuthWrapper>
  );
}

export default Signup;
