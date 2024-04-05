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
import { authenticate } from "@/app/lib/action";
import { useState } from "react";
import Image from "next/image";

export default function LoginForm({
  isSignUp,
  setIsSignUp,
}: Readonly<{ isSignUp: boolean; setIsSignUp: (val: boolean) => void }>) {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [requestPassword, setRequestPassword] = useState(false);
  const [editEmail, setEditEmail] = useState(true);
  const [isLogginWithGoogle, setIsLogginWithGoogle] = useState(false);
  const [emailValidity, setEmailValidity] = useState(true);

  const validateEmailInput = () => {
    const inpElem = document.getElementById("login-email") as HTMLInputElement;

    if (inpElem) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(inpElem.value);
    } else {
      return false;
    }
  };
  return (
    <form
      action={dispatch}
      className={clsx(
        "space-y-3 transition-transform duration-500 ease-in-out relative",
        {
          " -translate-x-[900px] pointer-events-none": isSignUp,
        }
      )}
    >
      <p className="text-center text-lg">To Continue Please Login</p>
      <div
        className="flex h-8 items-end space-x-1 absolute top-5"
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
      <div
        className={clsx(
          "flex flex-col gap-4 transition-transform duration-500 ease-in-out",
          {
            " translate-y-[700px]": !editEmail,
          }
        )}
      >
        <div>
          <label
            htmlFor="login-email"
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
          >
            Email
          </label>
          <div className="relative">
            <input
              name="email"
              id="login-email"
              autoComplete={`${isSignUp ? "off" : ""}`}
              type="email"
              onChange={() => {
                if (validateEmailInput()) {
                  setEmailValidity(true);
                } else {
                  setEmailValidity(false);
                }
              }}
              placeholder="Enter your email address."
              required={!isLogginWithGoogle}
              className="peer py-[10px] px-10 pr-14 w-full rounded-lg text-sm outline outline-1 outline-gray-400 focus:outline-gray-800 transition-all duration-300 ease-linear focus:invalid:outline-2 focus:invalid:outline-red-400"
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 peer-focus:peer-invalid:text-red-400" />
            <button
              type="button"
              disabled={isLogginWithGoogle}
              onClick={() => {
                if (validateEmailInput()) {
                  setEmailValidity(true);
                  setEditEmail(false);
                  setTimeout(() => {
                    setRequestPassword(true);
                  }, 600);
                } else {
                  setEmailValidity(false);
                }
              }}
              className=" bg-orange-300 hover:bg-orange-400 rounded-lg p-1 text-white transition-colors duration-300 ease-linear absolute top-0 right-0"
            >
              <ArrowRightIcon className="w-10 h-8" />
            </button>
          </div>
          {!emailValidity && (
            <span className=" text-xs text-red-400">
              Provide a valid email address
            </span>
          )}
        </div>

        {/* sign in with google   */}
        <div className=" flex flex-col gap-2">
          <span className="flex flex-row gap-3 items-center">
            <hr className="w-1/2" />
            <span>or</span>
            <hr className="w-1/2" />
          </span>
          <button
            onClick={() => {
              setIsLogginWithGoogle(true);
            }}
            className={clsx(
              " w-full flex flex-row items-center justify-center gap-3 bg-orange-300 hover:bg-orange-400 py-3 rounded-lg transition-colors duration-300 ease-linear",
              {
                "bg-white border border-orange-400 hover:bg-white":
                  isLogginWithGoogle,
              }
            )}
          >
            <Image src={googleIcon} alt="" width={25} height={25} />
            {!isLogginWithGoogle ? (
              <span className="text-white font-bold text-xl">Google</span>
            ) : (
              <div className=" w-6 h-6 border-2 border-orange-400 border-t-0 animate-spin repeat-infinite rounded-full duration-500 " />
            )}
          </button>
        </div>

        {/* sign up trigger */}
        <button
          type="button"
          disabled={isLogginWithGoogle}
          onClick={() => {
            setIsSignUp(true);
          }}
          className="w-full text-sm flex flex-row items-center justify-center gap-2"
        >
          <span className="text-xs text-blue-600 hover:underline">sign up</span>
          <span>to create an account</span>
        </button>
      </div>

      {/* Password section */}
      <div
        className={clsx(
          "flex flex-col gap-5 transition-transform duration-500 ease-in-out",
          {
            " translate-y-64": !requestPassword,
            " -translate-y-52": requestPassword,
          }
        )}
      >
        <div>
          <label
            htmlFor="password"
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
          >
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              id="password"
              type="password"
              minLength={6}
              placeholder="Enter Your Password."
              required={!isLogginWithGoogle}
              className="peer py-[10px] px-10 pr-14 w-full rounded-lg outline outline-1 text-sm outline-gray-400 focus:outline-gray-800 transition-all duration-300 ease-linear focus:invalid:outline-2 focus:invalid:outline-red-400"
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-[110%] text-gray-500 peer-focus:text-gray-900 peer-focus:peer-invalid:text-red-400" />
            <span className=" text-xs text-gray-500 peer-focus:peer-invalid:text-red-400">
              Minimum 6 characters
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-4">
          <button
            type="button"
            onClick={() => {
              setRequestPassword(false);
              setTimeout(() => {
                setEditEmail(true);
              }, 600);
            }}
            className="w-1/2 bg-orange-300 hover:bg-orange-400 text-white font-bold rounded-lg p-3 transition-colors duration-300 ease-linear"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/2 bg-orange-300 hover:bg-orange-400 text-white font-bold rounded-lg p-3 transition-colors duration-300 ease-linear"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}
