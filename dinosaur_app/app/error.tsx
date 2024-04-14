"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto  w-full max-w-[400px] flex-col space-y-2.5 p-4 rounded-xl border border-black outline outline-orange-400 -outline-offset-8 overflow-hidden md:h-[85vh] ">
        <span className="w-full h-full text-center flex flex-col items-center justify-center text-md font-semibold">
          Something went wrong while processing your request; Try again Later.
          If the issue persists, please report it with a description to
          <a
            href="mailto:werukioni@gmail.com"
            target="_blank"
            className="text-blue underline underline-offset-2"
          >
            <strong>User Support</strong>
          </a>{" "}
          <br />
          <span className=" text-3xl font-bold">
            Thank you for your patience!
          </span>
          <Button
            onClick={() => {
              router.push("/");
            }}
            className=" mt-6 bg-orange-300 hover:bg-orange-400 p-3 text-sm transition-colors duration-500 ease-linear"
          >
            Dismiss
          </Button>
        </span>
      </div>
    </main>
  );
};

export default ErrorPage;
