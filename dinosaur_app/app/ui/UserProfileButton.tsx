"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const UserProfileButton = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <main className="relative">
        <div className=" fixed right-3 top-24 bg-black text-white  rounded-lg bg-gradient-to-br from-black via-orange-300 to-orange-400 p-3 transition-transform duration-500 ease-in-out flex flex-col gap-2">
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
            <span className="text-sm text-white">
              Hello, {session.user?.name?.split(" ")[0]}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              signOut();
            }}
            className=" p-3 bg-white rounded-xl text-sm text-black"
          >
            Sign Out
          </button>
        </div>
      </main>
    );
  }
};

export default UserProfileButton;
