"use client";
import clsx from "clsx";
import LoginForm from "@/app/login/ui/LoginForm";
import RandomFacts from "@/app/login/ui/RandomFacts";
import { useState } from "react";
import SignUpForm from "./ui/SignUpForm";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 rounded-xl border border-black outline outline-orange-400 -outline-offset-8 overflow-hidden md:h-[85vh]">
        <div
          className={clsx(
            "flex h-20 shrink-0 w-full items-end rounded-lg bg-gradient-to-br from-slate-400 via-black to-black border-4 border-orange-400 border-t-0 border-l-0 p-3 md:h-[40%] transition-transform duration-500 ease-in-out",
            {
              " -translate-x-[900px]": isSignUp,
            }
          )}
        >
          <div className="w-32  text-white md:w-36">
            <RandomFacts />
          </div>
        </div>
        <LoginForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
        <SignUpForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
      </div>
    </main>
  );
}
