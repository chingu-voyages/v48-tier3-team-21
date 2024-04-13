import { ReactNode } from "react";
import LayoutHeader from "./ui/LayoutHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Charts and Tables",
};

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full">
      <LayoutHeader />
      {children}
    </div>
  );
};

export default layout;
