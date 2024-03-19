import HeroSection from "./HeroSection";
import DinoWorldMap from "./DinoWorldMap";

const LandingPage = () => {
  return (
    <div className="w-full flex flex-col">
      {/* Hero section */}
      <HeroSection />

      {/* map overview section */}
      <DinoWorldMap />

      {/* footer section */}
    </div>
  );
};

export default LandingPage;
