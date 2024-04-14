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
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SignUpForm({
  isSignUp,
  setIsSignUp,
}: Readonly<{ isSignUp: boolean; setIsSignUp: (val: boolean) => void }>) {
  const [redirectURL, setRedirectURL] = useState("");
  const [errorMessage, dispatch] = useFormState(new_signup, undefined);
  const [isContinueSignUp, setIsContinueSignUp] = useState(false);
  const [isPasswordConfrimed, setIsPasswordConfirmed] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [attemptSignUp, setAttemptSignUp] = useState(false);
  const [isLogginWithGoogle, setIsLogginWithGoogle] = useState(false);
  const passwordRef = useRef<any>(null);

  useEffect(() => {
    if (errorMessage) {
      setIsContinueSignUp(false);
    }
  }, [errorMessage]);
  useEffect(() => {
    setRedirectURL(window.location.href);
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setIsLogginWithGoogle(false);
    }
  }, [errorMessage]);

  const validateEmailInput = () => {
    const inpElem = document.getElementById("signup-email") as HTMLInputElement;

    if (inpElem) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(inpElem.value)) {
        setIsEmailValid(true);
        return true;
      } else {
        setIsEmailValid(false);
        return false;
      }
    } else {
      return false;
    }
  };

  const handleComparePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    if (passwordRef.current) {
      const passwordValue = passwordRef?.current.value;
      if (passwordValue === inputValue) {
        setIsPasswordConfirmed(true);
      } else {
        setIsPasswordConfirmed(false);
      }
    }
  };
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
      <input
        type="text"
        name={"callbackUrl"}
        id="callbackUrl-input"
        readOnly
        value={redirectURL}
        className="absolute -translate-y-80 opacity-0"
      />
      <div
        className="flex h-8 items-end space-x-1 absolute top-10"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && typeof errorMessage === "string" && (
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
                id="signup-email"
                type="email"
                onChange={validateEmailInput}
                autoComplete={`${isContinueSignUp ? "off" : ""}`}
                placeholder="Enter your email address."
                required
                className="peer py-[10px] px-10 pr-14 w-full rounded-lg text-sm outline outline-1 outline-gray-400 focus:outline-gray-800 transition-all duration-300 ease-linear focus:invalid:outline-2 focus:invalid:outline-red-400"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 peer-focus:peer-invalid:text-red-400" />
            </div>
            {isEmailValid ? (
              <span className=" text-xs text-gray-500">
                We&apos;ll need your confirmation to verify email
              </span>
            ) : (
              <span className=" text-xs text-red-400">
                Provide a valid email address
              </span>
            )}

            <button
              type="button"
              onClick={() => {
                if (validateEmailInput()) {
                  setIsContinueSignUp(true);
                }
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
            <button
              disabled={isLogginWithGoogle}
              onClick={() => {
                setIsLogginWithGoogle(true);
                dispatch(new FormData());
              }}
              className={clsx(
                " w-full flex flex-row items-center justify-between bg-orange-300 hover:bg-orange-400 py-3 rounded-lg transition-colors duration-300 ease-linear px-4",
                {
                  "bg-white border-2 border-orange-400 hover:bg-white ":
                    isLogginWithGoogle,
                }
              )}
            >
              <Image src={googleIcon} alt="" width={25} height={25} />

              {isLogginWithGoogle ? (
                <div className=" w-6 h-6 border-2 border-orange-400 border-t-0 animate-spin repeat-infinite rounded-full duration-500 " />
              ) : (
                <span className="grow text-white text-md text-center">
                  Continue with Google
                </span>
              )}
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
            ref={passwordRef}
            name="password"
            id="signup-password"
            autoComplete={`off`}
            type="password"
            placeholder="Password"
            required
            minLength={6}
            className=" p-4 w-full rounded-lg text-sm outline outline-1 outline-gray-400 focus:outline-gray-800 transition-all duration-300 ease-linear invalid:outline-2 invalid:outline-red-400 focus:invalid:outline-red-400"
          />
          <span className=" text-xs text-gray-500">Minimum 6 characters</span>
          <input
            name="compare-password"
            id="compare-password"
            autoComplete={`off`}
            onChange={handleComparePassword}
            type="password"
            placeholder="Confirm Password"
            required
            className={clsx(
              " mt-2 p-4 w-full rounded-lg text-sm outline outline-1 outline-gray-400 focus:outline-gray-800 transition-all duration-300 ease-linear",
              {
                " outline-red-400 focus:outline-red-400": !isPasswordConfrimed,
              }
            )}
          />
          {!isPasswordConfrimed && (
            <span className=" text-xs text-red-400">Passwords must match</span>
          )}
        </div>

        <span className=" text-xs text-gray-500 mt-5">
          By selecting <strong>Agree and Continue</strong> below, I agree to the{" "}
          <Link
            target="_blank"
            href={"/extras/about-us/terms-conditions"}
            className=" text-blue-500 underline underline-offset-1"
          >
            terms of service
          </Link>{" "}
          of this app <strong>digging-into-dinosaurs</strong>
        </span>

        <button
          type="submit"
          onClick={() => {
            if (isPasswordConfrimed) {
              setAttemptSignUp(true);
            }
          }}
          disabled={!isPasswordConfrimed}
          className={clsx(
            "w-full bg-orange-300 hover:bg-orange-400 text-white font-bold rounded-lg p-3 my-2 transition-colors duration-300 ease-linear flex items-center justify-center",
            {
              " opacity-100": isPasswordConfrimed,
              "opacity-50": !isPasswordConfrimed,
              "bg-white border-2 border-orange-400 hover:bg-white":
                attemptSignUp,
            }
          )}
        >
          {attemptSignUp && !errorMessage ? (
            <div className=" w-6 h-6 border-2 border-orange-400 border-t-0 animate-spin repeat-infinite rounded-full duration-500 " />
          ) : (
            <span>Agree and Continue</span>
          )}
        </button>
      </div>
    </form>
  );
}
