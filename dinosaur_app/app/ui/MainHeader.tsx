import RootHeader from "@/app/ui/RootHeader";
import UserProfile from "./UserProfile";
import RandomFactPopUp from "./RandomFactPopUp";

const MainHeader = () => {
  return (
    <div style={{ zIndex: 999 }} className=" w-full sticky top-0">
      <RootHeader />
      <UserProfile />
      <RandomFactPopUp />
    </div>
  );
};

export default MainHeader;
