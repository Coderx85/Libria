"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";
import { signInWithCredentials } from "@/actions/auth.action";

const Page = () => (
  <AuthForm
    type="SIGN_IN"
    schema={signInSchema}
    defaultValues={{
      email: "",
      password: "",
    }}
    onSubmit={signInWithCredentials}
  />
);

export default Page;
