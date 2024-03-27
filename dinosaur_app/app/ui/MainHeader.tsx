"use client";

import Link from "next/link";
import MobileNavigation from "./MobileNavigation";
import { useEffect, useState } from "react";

export const NavLinks = () => {
  return (
    <div className="w-full flex max-sm:flex-col sm:flex-row items-center max-sm:items-end gap-5 text-sm font-bold">
      <Link href={"/"}>Home</Link>
      <Link href={"/explore-dino"}>Go Digging</Link>
      <Link href={"/charts-table"}>Data</Link>
      <Link href={"/dino-news"}>News</Link>
      <Link href={"/extras/about-us"}>About Us</Link>
    </div>
  );
};

const MainHeader = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    setIsMobileView(window.innerWidth < 640);
  }, []);

  return (
    <nav className="flex flex-row items-center justify-between px-2 pr-5 p-1 ">
      <Link href={"/"} className=" font-cabinSketch ">
        Digging Into Dinosaurs
      </Link>

      {isMobileView ? (
        <MobileNavigation />
      ) : (
        <section className="max-sm:hidden">
          <NavLinks />
        </section>
      )}
    </nav>
  );
};

export default MainHeader;
