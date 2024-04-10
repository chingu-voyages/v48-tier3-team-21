import RootHeader from "@/app/ui/RootHeader";
import UserProfile from "./UserProfile";

const MainHeader = () => {
  return (
    <div style={{ zIndex: 999 }} className=" w-full sticky top-0">
      <RootHeader />
      <UserProfile />
    </div>
  );
};

export default MainHeader;
