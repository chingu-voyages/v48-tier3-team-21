import React, { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Dinosaurs",
};

const ExploreDinoLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <div>{children}</div>;
};

export default ExploreDinoLayout;
