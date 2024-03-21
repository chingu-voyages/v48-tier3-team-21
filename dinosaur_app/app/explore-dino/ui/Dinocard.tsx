"use client";
import React, { Suspense } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin } from "lucide-react";
import dinoHeroImage from "@/public/landing-page/dinosaur-background-image.jpg";
import { dinoDescription } from "@/app/lib/constants";

type DinocardProps = {
  id: number;
  name: string;
  location: string;
  imageSrc: string;
  description: string;
};

const Dinocard = ({
  id,
  name,
  location,
  imageSrc,
  description,
}: DinocardProps) => {
  return (
    <Card className="w-[380px] h-[400px]" suppressHydrationWarning>
      <CardHeader>
        <Image
          src={imageSrc === "N/A" ? dinoHeroImage : imageSrc}
          alt={name}
          width={1376}
          height={768}
          className="w-[380px] h-[100px]"
        />
        <div className="flex justify-between items-center py-2">
          <CardTitle className="text-orange-600 font-extrabold">
            {name}
          </CardTitle>
          <CardDescription className="flex flex-row justify-center items-center gap-x-2">
            <MapPin className="text-red" />
            <span>{location.split(",")[0]}</span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="h-[96px] overflow-hidden">
        <div className="text-slate-500">
          {description === "N/A"
            ? dinoDescription.substring(0, 150)
            : description.substring(0, 150)}
          ...
        </div>
      </CardContent>
      <CardFooter className="flex justify-end items-center mt-4">
        <Link
          href={`explore-dino/${id}`}
          className="text-white bg-orange-500  hover:bg-orange-300 h-10 px-4 py-2 rounded-md transition-all"
        >
          Dig More
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Dinocard;
