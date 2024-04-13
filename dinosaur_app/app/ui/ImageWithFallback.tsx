"use client";
import Image from "next/image";
import dinoIcon from "@/public/dino_icon.svg";
import { fileURLToPath, pathToFileURL } from "url";
import { getURL } from "next/dist/shared/lib/utils";
import { url } from "inspector";

type ImageProps = {
  sourceURL: string;
  alt: string;
  width: number;
  height: number;
  loading: "lazy" | "eager";
  moreStyles: string;
};

const ImageWithFallback = ({
  sourceURL,
  alt,
  width,
  height,
  loading,
  moreStyles,
}: ImageProps) => {
  return (
    <Image
      src={sourceURL}
      alt={alt}
      width={width}
      height={height}
      // onError={(e) => {
      //   if (!e.currentTarget.naturalWidth) {
      //     e.currentTarget.srcset = dinoIcon;
      //   }
      // }}
      loading={loading}
      className={`${moreStyles} shrink-0`}
    />
  );
};

export default ImageWithFallback;
