import { deleteSearchHistory } from "@/app/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    const reqData = await req.json();

    let confirmation = await deleteSearchHistory(reqData);

    if (!confirmation) {
      throw new Error(
        "Delete Operation Failed! Check Server Logs For more Details"
      );
    }

    return new NextResponse(JSON.stringify({ message: "success" }), {
      status: 202,
    });
  } catch (error) {
    console.log("Failed to delete specified search history: ", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to delete specified search history" }),
      { status: 500 }
    );
  }
};
