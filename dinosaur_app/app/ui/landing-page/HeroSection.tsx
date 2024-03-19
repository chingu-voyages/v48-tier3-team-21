import Image from "next/image";
import React from "react";
import dinoHeroImage from "@/public/landing-page/dinosaur-background-image.jpg";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="w-full z-10 relative">
      <Image
        src={dinoHeroImage}
        alt="Hero section Image of a dinosaur skeleton walking on dirt"
        width={1374}
        height={768}
        className=" w-auto z-0 "
      />
      <div className="absolute top-0 left-0 w-full flex flex-col justify-between">
        <div className="w-full text-center flex flex-col items-center justify-center gap-4 text-white bg-black bg-opacity-30 py-20 max-md:h-[50vh] h-[75vh] max-sm:px-5 ">
          <h1 className=" text-9xl max-md:text-6xl font-cabinSketch font-medium max-sm:text-5xl">
            Digging Into Dinosaurs
          </h1>
          <span className="font-bold text-md max-sm:text-sm">
            Fun facts about our million year old friends. Go Digging and see
            what you learn!
          </span>

          <div className="flex flex-row gap-2">
            <Button className="text-sm bg-orange-300">Maps & Chats</Button>
            <Button className="text-sm bg-orange-300">Data Table</Button>
          </div>
        </div>

        <p className="w-full p-2 max-sm:px-3 sm:text-center text-start text-sm bg-white ">
          Dinosaurs first appeared between 247 and 240 million years ago. They
          ruled the Earth for about 175 million years until an extinction event
          65.5 million years ago wiped out all of them, except for the avian
          dinosaurs. Scientists don&apos;t agree entierly on what happened, but
          the extinction likely was a double or triple whammy involving an
          asteroid impact, chocking chemicals from erupting volcanoes, climate
          change and possibly other factors. Utilizing data from public sources
          like Kaggle & Tableau, we&apos;ve created an interactive website for
          allthe fun facts we found in the data about dinosaurs! See where and
          when they lived, what they ate, and individual dinosaur facts! When
          you&apos;re done, be sure and visit this <a href="https://">link</a>{" "}
          from the <strong>American Museum of Natural History</strong> for more
          fun dinosaur facts or this <a href="https://">link</a> to visit the
          Natural History Museum&spos;s Dino Directory!!
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
