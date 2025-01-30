"use client";
import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <Authenticator>{children}</Authenticator>;
};

export default AppProvider;
