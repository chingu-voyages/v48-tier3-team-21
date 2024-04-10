"use client";
import clsx from "clsx";
import { LogOutIcon, User2Icon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const UserProfileButton = () => {
  const { data: session, status } = useSession();
  const [isSessionCardOpen, setIsSessionCardOpen] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const sessionCard = document.getElementById(
      "user-session-card"
    ) as HTMLDivElement;

    const handleMouseEnter = (event: MouseEvent) => {
      setIsSessionCardOpen(true);
      setTimeout(() => {
        setShowButtons(true);
      }, 500);
    };

    const handleMouseLeave = (event: MouseEvent) => {
      setTimeout(() => {
        setShowButtons(false);
        setTimeout(() => {
          setIsSessionCardOpen(false);
        }, 600);
      }, 3000);
    };

    if (status === "authenticated" && sessionCard) {
      sessionCard.addEventListener("mouseenter", handleMouseEnter);
      sessionCard.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (status === "authenticated" && sessionCard) {
        sessionCard.removeEventListener("mouseenter", handleMouseEnter);
        sessionCard.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isSessionCardOpen, status]);

  if (status === "authenticated") {
    return (
      <main className="relative">
        <div
          id="user-session-card"
          className=" fixed right-1 top-24 bg-black text-white  rounded-lg bg-gradient-to-br from-black via-orange-300 to-orange-400 p-3 flex flex-col gap-2 transition-all duration-700 ease-in-out"
        >
          <div className=" flex flex-row gap-3 items-center justify-center">
            {session.user?.image ? (
              <Image
                src={session.user?.image}
                alt=""
                width={1376}
                height={768}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-white" />
            )}
            <span
              className={clsx("text-sm text-white", {
                hidden: !isSessionCardOpen,
              })}
            >
              Hello, {session.user?.name?.split(" ")[0]}
            </span>
          </div>

          {showButtons && (
            <div className="w-full flex flex-col gap-1">
              <button
                type="button"
                onClick={() => {
                  signOut();
                }}
                className=" p-3 bg-white rounded-xl text-sm text-black flex flex-row items-center justify-center gap-2"
              >
                <LogOutIcon />
                <span>Sign Out</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setProfileOpen(true);
                }}
                className=" p-3 bg-white rounded-xl text-sm text-black flex flex-row items-center justify-center gap-2"
              >
                <User2Icon />
                <span>Profile</span>
              </button>
            </div>
          )}
        </div>

        {profileOpen && (
          <div className=" max-md:p-3 absolute inset-0 bg-black  flex items-center justify-center w-full h-screen bg-opacity-50">
            <section className=" bg-white md:w-3/4 h-[80vh] w-full flex flex-col p-4 pt-12 gap-1 relative">
              <button
                onClick={() => {
                  setProfileOpen(false);
                }}
                className=" w-10 h-10 rounded-full absolute right-3 top-1 font-semibold text-4xl hover:shadow hover:shadow-black transition-all duration-300 ease-linear flex items-center justify-center"
              >
                <span className="-mt-2">x</span>
              </button>
              <hr className=" w-full" />
              <div className="w-full h-full flex md:flex-row flex-col md:gap-4 gap-2">
                {/* profile infomation */}
                <div className=" md:h-full md:w-1/4 w-full bg-black md:rounded-lg rounded-md p-2 flex md:flex-col flex-row items-center">
                  <div className=" md:w-full flex md:flex-col items-center">
                    {session.user?.image ? (
                      <Image
                        src={session.user?.image}
                        alt=""
                        width={1400}
                        height={1000}
                        className=" w-48 h-48 rounded-full"
                      />
                    ) : (
                      <div className="w-48 h-48 rounded-full bg-white" />
                    )}
                  </div>

                  <span className=" w-full md:mt-5 text-xl text-start text-white">
                    {session.user?.name}
                  </span>
                </div>

                {/* search history */}
                <div className="grow md:border-4 border-t-4 border-t-orange-400 md:border-t-0 md:border-r-0 md:border-l-orange-300 md:border-b-orange-400 md:rounded-md md:rounded-t-none md:rounded-r-none px-2">
                  <span className="text-black text-2xl underline underline-offset-8">
                    Search History:
                  </span>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    );
  }
};

export default UserProfileButton;
