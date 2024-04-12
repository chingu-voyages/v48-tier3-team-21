"use client";

import { useEffect, useState } from "react";
import RandomFacts from "../login/ui/RandomFacts";
import clsx from "clsx";

const RandomFactPopUp = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const pathname = new URL(window.location.href).pathname;
    if (!hasShown && (pathname === "/" || pathname === "/extras/about-us")) {
      setTimeout(() => {
        setShowPopUp(true);
        setHasShown(true);
      }, 5000);
    }
  }, [hasShown]);
  return (
    <main
      style={{ zIndex: 999 }}
      className={clsx(
        " absolute inset-0 bg-gray-700 bg-opacity-45 flex items-center justify-center h-screen w-full cursor-default",
        {
          hidden: !showPopUp,
        }
      )}
    >
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 rounded-xl border border-black outline outline-orange-400 -outline-offset-8 overflow-hidden bg-white">
        <button
          onClick={() => {
            setShowPopUp(false);
          }}
          className=" w-10 h-10 rounded-full absolute right-3 top-2 font-semibold text-4xl hover:shadow hover:shadow-black transition-all duration-300 ease-linear flex items-center justify-center bg-white"
        >
          <span className="-mt-2">x</span>
        </button>
        <div className="flex h-[40vh] md:h-[40%] shrink-0 w-full items-end rounded-lg bg-gradient-to-br from-slate-400 via-black to-black border-4 border-orange-400 border-t-0 border-l-0 p-3 transition-transform duration-500 ease-in-out">
          <div className="w-full  text-white">
            <RandomFacts />
          </div>
        </div>
      </div>
    </main>
  );
};

export default RandomFactPopUp;
