import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { NavLinks } from "./MainHeader";

const MobileNavigation = () => {
  return (
    <section className="">
      <DropdownMenu>
        <DropdownMenuTrigger className=" outline-none">
          <div className="w-7 flex flex-col items-start gap-1">
            <div className="w-full h-1 bg-black rounded-full" />
            <div className="w-full h-1 bg-black rounded-full" />
            <div className="w-full h-1 bg-black rounded-full" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[30vw] rounded-md bg-orange-300 text-white font-bold z-50 p-3 shadow-lg mr-5 mt-2">
          <NavLinks />
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};

export default MobileNavigation;
