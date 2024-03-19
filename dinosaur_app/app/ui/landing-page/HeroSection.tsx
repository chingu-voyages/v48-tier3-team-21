import Image from "next/image";
import React from "react";
import dinoHeroImage from "@/public/landing-page/dinosaur-background-image.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="w-full flex flex-col">
      <div className="relative max-sm:h-[50vh]">
        <Image
          priority
          src={dinoHeroImage}
          alt="Hero section Image of a dinosaur skeleton walking on dirt"
          width={1374}
          height={768}
          className=" w-auto "
        />
        <div className="absolute inset-0 w-full text-center flex flex-col items-center justify-center gap-4 max-sm:gap-2 text-white bg-black bg-opacity-30 py-20 max-sm:px-5 ">
          <h1 className=" text-9xl max-lg:text-6xl font-cabinSketch font-medium max-sm:text-5xl">
            Digging Into Dinosaurs
          </h1>
          <span className="font-bold text-md max-sm:text-sm">
            Fun facts about our million year old friends. Go Digging and see
            what you learn!
          </span>

          <div className="flex flex-row gap-2">
            <Link
              href={"/explore-dino"}
              className=" p-2 py-4 rounded-lg text-sm bg-orange-300"
            >
              Search on Map
            </Link>
            <Link
              href={"/chats-table"}
              className="p-2 py-4 text-sm rounded-lg bg-orange-300"
            >
              Chats & Data Table
            </Link>
          </div>
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
    </section>
  );
};

export default HeroSection;
