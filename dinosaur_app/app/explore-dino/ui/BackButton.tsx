"use client"

import React from "react";

import { Button } from "@/components/ui/button";
import {useRouter} from "next/navigation";
import { MoveLeftIcon } from "lucide-react";

const BackButton = () => {
    const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.back();
      }}
      className=" text-orange-300 hover:text-orange-400 border-2 border-orange-300 hover:border-orange-400 rounded-lg bg-white w-[150px] p-3 flex flex-row items-center justify-between"
    >
      <MoveLeftIcon /> More Dino
    </Button>
  );
};

export default BackButton;
