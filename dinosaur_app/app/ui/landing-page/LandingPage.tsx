import HeroSection from "./HeroSection";
import DinoWorldMap from "./DinoWorldMap";
import FooterSection from "./footer-section/FooterSection";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="w-full flex flex-col gap-20">
      {/* Hero section */}
      <HeroSection />

      {/* map overview section */}
      <div className=" w-full h-screen relative max-sm:flex flex-col items-center gap-3">
        <DinoWorldMap />
        <Link
          href={"/explore-dino"}
          className=" p-3 font-cabinSketch text-lg bg-orange-300 hover:bg-orange-400 rounded-md sm:absolute bottom-3 xl:left-[45%] max-xl:left-[40%]  flex flex-row gap-1 items-center transition-colors duration-500 ease-linear max-sm:w-[200px]"
        >
          Explore Dinos <MoveRightIcon className="text-white" />
        </Link>
      </div>

      {/* footer section */}
      <FooterSection />
    </div>
  );
};

export default LandingPage;
