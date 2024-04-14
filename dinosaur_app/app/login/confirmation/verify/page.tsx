import { verifyAccount } from "@/app/lib/action";
import Link from "next/link";
import React from "react";

const EmailVerificationPage = async ({
  searchParams,
}: {
  searchParams: { email: string };
}) => {
  const requestedEmail = searchParams.email;
  const isVerified = await verifyAccount(requestedEmail);

  if (isVerified) {
    return (
      <main className="flex items-center justify-center md:h-screen">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 rounded-xl border border-black outline outline-orange-400 -outline-offset-8 overflow-hidden md:h-[85vh] items-center justify-center">
          <p className="text-xl font-bold text-center">
            Your account with the email
            <br />
            <span className=" text-blue-600 underline underline-offset-8">
              {requestedEmail}
            </span>
            <br />
            has been verified successfully and is ready for use.
          </p>

          <div className="flex flex-row gap-5 items-center justify-center">
            <Link
              href={`/login?callbackUrl=${process.env.NEXTAUTH_URL}/explore-dino`}
              className=" bg-orange-300 hover:bg-orange-400 p-3 rounded-md text-white font-bold"
            >
              Login
            </Link>
            <Link
              href={"/"}
              className=" bg-orange-300 hover:bg-orange-400 p-3 rounded-md text-white font-bold"
            >
              Dismiss
            </Link>
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <main className="flex items-center justify-center md:h-screen">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 rounded-xl border border-black outline outline-orange-400 -outline-offset-8 overflow-hidden md:h-[85vh] items-center justify-center">
          <p className="text-xl font-bold text-center">
            The Account Verification Failed to reactivate a close account and/or
            more learn more information about account maintainance contact user
            support. Also be sure to read our{" "}
            <Link href={"/extras/terms-of-use"} target="_blank">
              <strong>terms of use</strong>
            </Link>{" "}
            and{" "}
            <Link href={"/extras/terms-of-use"} target="_blank">
              <strong>Privacy Policy</strong>
            </Link>
            .
          </p>
          <Link
            href={"/"}
            className=" bg-orange-300 hover:bg-orange-400 p-3 rounded-md text-white font-bold"
          >
            Dismiss
          </Link>
        </div>
      </main>
    );
  }
};

export default EmailVerificationPage;
