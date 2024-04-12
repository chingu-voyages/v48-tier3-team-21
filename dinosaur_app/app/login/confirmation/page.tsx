import Link from "next/link";
import React from "react";

const RequestUserConfirmationPage = ({
  searchParams,
}: {
  searchParams: { email: string };
}) => {
  const requestedEmail = searchParams.email;
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 rounded-xl border border-black outline outline-orange-400 -outline-offset-8 overflow-hidden md:h-[85vh] items-center justify-center">
        <p className="text-xl font-bold text-center">
          An Email has been sent to
          <br />
          <span className=" text-blue-600 underline underline-offset-8">
            {requestedEmail}
          </span>
          <br />
          check and click on <strong>verify email</strong> to proceed using the
          newly created account
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
};

export default RequestUserConfirmationPage;
