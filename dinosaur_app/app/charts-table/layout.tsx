import { ReactNode } from "react";
import LayoutHeader from "./ui/LayoutHeader";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full">
      <LayoutHeader />
      {children}
    </div>
  );
};

export default layout;
