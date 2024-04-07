import RootHeader from "@/app/ui/RootHeader";
import UserProfileButton from "./UserProfileButton";

const MainHeader = () => {
  return (
    <div style={{ zIndex: 999 }} className=" w-full sticky top-0">
      <RootHeader />
      <UserProfileButton />
    </div>
  );
};

export default MainHeader;
