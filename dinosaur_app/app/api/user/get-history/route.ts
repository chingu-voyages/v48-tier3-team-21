import { getUserSearchHistory } from "@/app/lib/utils";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await auth();

    let result = null;
    if (session?.user?.email) {
      result = await getUserSearchHistory(session.user.email);
    }

    return new NextResponse(JSON.stringify({ userSearchHistory: result }), {
      status: 200,
    });
  } catch (error) {
    console.log("Failed to retrive user Search History: ", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to retrive user Search History" }),
      { status: 500 }
    );
  }
};
