import React, { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login To Continue",
};

const LoginLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <div>{children}</div>;
};

export default LoginLayout;
