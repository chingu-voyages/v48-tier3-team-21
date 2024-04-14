"use client";

import Link from "next/link";
import MobileNavigation from "./MobileNavigation";
import { useEffect, useState } from "react";

export const NavLinks = () => {
  return (
    <div className="w-full flex max-sm:flex-col sm:flex-row items-center max-sm:items-end gap-5 text-sm font-bold">
      <Link
        href={"/"}
        className=" hover:text-orange-400 hover:underline underline-offset-2 transition-colors duration-300 ease-linear "
      >
        Home
      </Link>
      <Link
        href={"/explore-dino"}
        className=" hover:text-orange-400 hover:underline underline-offset-2 transition-colors duration-300 ease-linear "
      >
        Go Digging
      </Link>
      <Link
        href={"/charts-table"}
        className=" hover:text-orange-400 hover:underline underline-offset-2 transition-colors duration-300 ease-linear "
      >
        Data
      </Link>
      <Link
        href={"/dino-news"}
        className=" hover:text-orange-400 hover:underline underline-offset-2 transition-colors duration-300 ease-linear "
      >
        News
      </Link>
      <Link
        href={"/extras/about-us"}
        className=" hover:text-orange-400 hover:underline underline-offset-2 transition-colors duration-300 ease-linear "
      >
        About Us
      </Link>
    </div>
  );
};

const MainHeader = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    setIsMobileView(window.innerWidth < 640);
  }, []);

  return (
    <nav className="flex flex-row items-center justify-between px-2 pr-5 p-1 w-full z-50 shadow-md shadow-black bg-gray-100">
      <Link
        href={"/"}
        className=" font-cabinSketch bg-gradient-to-r from-orange-900 via-orange-700  to-orange-600 bg-clip-text text-transparent font-extrabold text-xl hover:text-black transition-colors duration-300 ease-linear"
      >
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
