"use client";
import Image from "next/image";
import dinoIcon from "@/public/dino_icon.svg";
import { useState } from "react";

type ImageProps = {
  sourceURL: string;
  alt: string;
  width?: number;
  height?: number;
  loading: "lazy" | "eager";
  moreStyles: string;
  isFill?: boolean;
};

const ImageWithFallback = ({
  sourceURL,
  alt,
  width,
  height,
  loading,
  moreStyles,
  isFill,
}: ImageProps) => {
  const [applyFallback, setApplyFallback] = useState(false);

  return (
    <Image
      src={sourceURL}
      alt={alt}
      fill={isFill}
      width={width || undefined}
      height={height || undefined}
      onError={(e) => {
        if (!e.currentTarget.naturalWidth || !e.currentTarget.complete) {
          e.currentTarget.src = dinoIcon.src;
          setApplyFallback(true);
        }
      }}
      loading={loading}
      className={`${moreStyles} shrink-0 ${applyFallback && "bg-orange-400"}`}
    />
  );
};

export default ImageWithFallback;
