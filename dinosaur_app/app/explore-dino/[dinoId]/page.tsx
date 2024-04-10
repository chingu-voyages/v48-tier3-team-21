import { dinoDescription } from "@/app/lib/constants";
import { getDinoById } from "@/app/lib/utils";
import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import dinoHeroImage from "@/public/landing-page/dinosaur-background-image.jpg";
import { redirect } from "next/navigation";
import BackButton from "../ui/BackButton";

interface SingleDynoProps {
  params: {
    dinoId: number;
  };
}

const SingleDyno = async ({ params }: SingleDynoProps) => {
  const { dinoId } = params;

  if (isNaN(Number(dinoId))) {
    redirect("/explore-dino");
  }
  const dino: any = await getDinoById(Number(dinoId));

  return (
    <main className="flex flex-col justify-center items-center mb-4 pt-6">
      <div className="w-3/4 mb-4">
        <BackButton />
      </div>
      <div className="w-3/4">
        <Image
          src={dino?.imageSrc === "N/A" ? dinoHeroImage : dino?.imageSrc}
          alt={dino?.name}
          width={1400}
          height={1000}
          className="w-full md:h-[600px]"
        />
        <div className="flex justify-between w-full mt-4  flex-col md:flex-row">
          <h1 className="text-orange-600 font-extrabold uppercase text-3xl">
            {dino?.name}
          </h1>
          <p className="flex justify-center items-center gap-x-2">
            <MapPin className="text-red" />
            {dino?.foundIn}
          </p>
        </div>
        <div className="mt-5">
          <h2 className="text-orange-500 font-semibold text-[1.5rem]">
            Discovering the Dinosaur
          </h2>
          <p className="text-slate-600 mt-2">
            {dino?.description === "N/A" ? dinoDescription : dino?.description}
          </p>
        </div>
        <div>
          <h2 className="text-orange-500 font-semibold text-[1.5rem] mt-5">
            When Lived
          </h2>
          <p className="text-slate-600 mt-2">
            {dino?.whenLived === "N/A" ? "Unknown" : dino?.whenLived}
          </p>
        </div>
        <div>
          <h2 className="text-orange-500 font-semibold text-[1.5rem] mt-5">
            Physical Characteristics
          </h2>
          <div className="flex justify-between flex-col md:flex-row">
            <p className="text-slate-600 mt-2">
              <span className="font-semibold">Type</span> :{" "}
              {dino?.typeOfDinosaur.toUpperCase()}
            </p>
            <p className="text-slate-600 mt-2">
              <span className="font-semibold">Length</span>: {dino?.length}{" "}
              meters
            </p>
            <p className="text-slate-600 mt-2">
              <span className="font-semibold">Weight</span>:{" "}
              {dino?.weight === "N/A" ? "unknown" : dino?.weight} kilograms
            </p>
            <p className="text-slate-600 mt-2">
              <span className="font-semibold">Diet</span>:{" "}
              {dino?.diet === "N/A" ? "Unknown" : dino?.diet}
            </p>
          </div>
          <div>
            <h2 className="text-orange-500 font-semibold text-[1.5rem] mt-5">
              Taxonomy
            </h2>
            <div className="flex md:justify-between  flex-col md:flex-row md:gap-3 pt-2 ">
              <div className="text-slate-600 flex gap-x-1">
                <p className="font-semibold">Named By:</p>
                <div>{dino?.namedBy}</div>
              </div>
              <p className="text-slate-600 ">
                <span className="font-semibold">Species</span>:
                {dino?.typeSpecies}
              </p>
              <div className="text-slate-600 flex gap-x-1">
                <p className="font-semibold">Taxonomy:</p>
                <div>{dino?.taxonomy}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleDyno;
