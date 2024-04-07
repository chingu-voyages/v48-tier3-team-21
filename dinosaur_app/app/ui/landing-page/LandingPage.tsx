import HeroSection from "./HeroSection";
import DinoWorldMap from "./DinoWorldMap";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import {
  fetchDinoData,
  getDecadesFromData,
  getDigSites,
} from "@/app/lib/utils";
import { Suspense } from "react";
import Loading from "../Loading";

const LandingPage = async () => {
  const dinoData = (await fetchDinoData()) || [];
  const digSites = (await getDigSites()) || [];
  const clientSafeData = dinoData?.map((dataObj) => ({
    id: dataObj.id,
    name: dataObj.name,
    imageSrc: dataObj.imageSrc,
    typeOfDinosaur: dataObj.typeOfDinosaur,
    length: dataObj.length,
    weight: dataObj.weight,
    diet: dataObj.diet,
    whenLived: dataObj.whenLived,
    foundIn: dataObj.foundIn,
    geoLocations: dataObj.geoLocations,
    taxonomy: dataObj.taxonomy,
    namedBy: dataObj.namedBy,
    typeSpecies: dataObj.typeSpecies,
    description: dataObj.description,
  }));

  const decades = (await getDecadesFromData(clientSafeData)) || [];

  return (
    <div className="w-full flex flex-col gap-20">
      {/* Hero section */}
      <HeroSection />

      {/* map overview section */}
      <div className=" w-full relative flex flex-col items-center gap-3">
        <DinoWorldMap
          dinoData={clientSafeData}
          digSites={digSites}
          decades={decades}
        />
        <Link
          href={"/explore-dino"}
          className=" p-3 font-cabinSketch text-lg bg-orange-300 hover:bg-orange-400 rounded-md  flex flex-row gap-1 items-center transition-colors duration-500 ease-linear w-[200px]"
        >
          Explore Dinos <MoveRightIcon className="text-white" />
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
