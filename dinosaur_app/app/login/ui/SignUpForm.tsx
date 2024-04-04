"use client";
import clsx from "clsx";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import googleIcon from "@/public/google-icon.svg";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useFormState, useFormStatus } from "react-dom";
import { new_signup } from "@/app/lib/action";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SignUpForm({
  isSignUp,
  setIsSignUp,
}: Readonly<{ isSignUp: boolean; setIsSignUp: (val: boolean) => void }>) {
  const [errorMessage, dispatch] = useFormState(new_signup, undefined);
  const [isContinueSignUp, setIsContinueSignUp] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setIsContinueSignUp(false);
    }
  }, [errorMessage]);

  return (
    <form
      action={dispatch}
      className={clsx(
        "space-y-3 absolute inset-0 mx-auto p-4 transition-transform duration-500 ease-in-out",
        {
          " translate-x-[900px]": !isSignUp,
        }
      )}
    >
      <div
        className="flex h-8 items-end space-x-1 absolute top-10"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
      {/* First sign up page */}
      <div
        className={clsx(
          "w-full transition-transform duration-500 ease-in-out",
          {
            " -translate-x-[600px]": isContinueSignUp,
          }
        )}
      >
        <p className="text-center text-lg font-bold my-3">Sign Up </p>
        <div
          className={clsx(
            "flex flex-col gap-4 transition-transform duration-500 ease-in-out"
          )}
        >
          <div>
            <label
              htmlFor="email"
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            >
              Email
            </label>
            <div className="relative">
              <input
                name="email"
                id="email"
                type="email"
                autoComplete={`${isContinueSignUp ? "off" : ""}`}
                placeholder="Enter your email address."
                required
                className="peer py-[10px] px-10 pr-14 w-full rounded-lg text-sm outline outline-1 outline-gray-400 focus:outline-gray-800 transition-all duration-300 ease-linear focus:invalid:outline-2 focus:invalid:outline-red-400"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 peer-focus:peer-invalid:text-red-400" />
            </div>
            <span className=" text-xs text-gray-500">
              We&apos;ll need your confirmation to verify email
            </span>

            <button
              type="button"
              onClick={() => {
                setIsContinueSignUp(true);
              }}
              className="w-full font-bold bg-orange-400 hover:bg-orange-300 text-white rounded-lg mt-5 p-4 transition-colors duration-300 ease-linear"
            >
              Continue
            </button>
          </div>

          <div className="w-full flex flex-row items-center gap-3">
            <hr className="w-1/2" />
            <span>or</span>
            <hr className="w-1/2" />
          </div>

          <div>
            <button className=" w-full flex flex-row items-center justify-between bg-orange-300 hover:bg-orange-400 py-3 rounded-lg transition-colors duration-300 ease-linear px-4">
              <Image src={googleIcon} alt="" width={25} height={25} />
              <span className="grow text-white text-md text-center">
                Continue with Google
              </span>
            </button>

            {/* log in trigger */}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
              }}
              className="w-full text-sm flex flex-row items-center justify-start gap-2 mt-5 "
            >
              <span>Already have an account? </span>
              <span className="text-xs text-blue-600 hover:underline">
                Log In
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* second sign up page */}
      <div
        className={clsx(
          "flex flex-col gap-3 -translate-y-[390px] transition-transform duration-500 ease-in-out",
          {
            " translate-x-[900px]": !isContinueSignUp,
          }
        )}
      >
        <p className="text-center text-lg font-bold my-4">Finish signing up</p>
        <div>
          <input
            name="firstname"
            id="firstname"
            autoComplete={`off`}
            type="text"
            placeholder="First name"
            required
            className="p-4 w-full rounded-lg rounded-b-none text-sm outline outline-1 outline-gray-400 focus:outline-gray-800 transition-all duration-300 ease-linear"
          />
          <input
            name="lastname"
            id="lastname"
            autoComplete={`off`}
            type="text"
            placeholder="Last name"
            required
            className="p-4 w-full rounded-lg rounded-t-none text-sm outline outline-1 outline-gray-400 focus:outline-gray-800 transition-all duration-300 ease-linear"
          />
          <span className=" text-xs text-gray-500">
            Make sure it matches the name on your government ID.
          </span>
        </div>

        {/* password inputs */}
        <div>
          <input
            name="password"
            id="password"
            autoComplete={`off`}
            type="password"
            placeholder="Password"
            required
            className=" p-4 w-full rounded-lg text-sm outline outline-1 outline-gray-400 focus:outline-gray-800 transition-all duration-300 ease-linear"
          />
          <span className=" text-xs text-gray-500">Minimum 6 characters</span>
          <input
            name="confirm-password"
            id="confirm-password"
            autoComplete={`off`}
            type="password"
            placeholder="Confirm Password"
            required
            className=" mt-2 p-4 w-full rounded-lg text-sm outline outline-1 outline-gray-400 focus:outline-gray-800 transition-all duration-300 ease-linear"
          />
        </div>

        <span className=" text-xs text-gray-500 mt-5">
          By selecting <strong>Agree and Continue</strong> below, I agree to the{" "}
          <Link
            target="_blank"
            href={"/extras/about-us/terms-conditions"}
            className=" text-blue-500 underline underline-offset-1"
          >
            terms and conditions
          </Link>{" "}
          of this app <strong>digging-into-dinosaurs</strong>
        </span>

        <button
          type="submit"
          className="w-full bg-orange-300 hover:bg-orange-400 text-white font-bold rounded-lg p-3 mt-2 transition-colors duration-300 ease-linear"
        >
          Agree and Continue
        </button>
      </div>
    </form>
  );
}
