"use client";

import { Button } from "@/components/ui/button";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

const BackButton = () => {
  const searchParams = useSearchParams();
  const scrollback = searchParams.has("scroll", "true");
  const router = useRouter();

  return scrollback ? (
    <Button
      onClick={() => {
        router.back();
      }}
      className=" text-orange-300 hover:text-orange-400 border-2 border-orange-300 hover:border-orange-400 rounded-lg bg-white w-[150px] p-3 flex flex-row items-center justify-between"
    >
      <MoveLeftIcon /> More News
    </Button>
  ) : (
    <Link
      href={"/dino-news/"}
      className=" text-orange-300 hover:text-orange-400 border-2 border-orange-300 hover:border-orange-400 rounded-lg bg-white w-[150px] p-3 flex flex-row items-center justify-between"
    >
      <MoveLeftIcon /> More News
    </Link>
  );
};

export default BackButton;
