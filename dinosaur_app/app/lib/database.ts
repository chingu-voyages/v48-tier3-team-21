import { PrismaClient } from "@prisma/client";
import { SignUpDataType } from "./definitions";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") {
  globalThis.prisma = db;
}

type SearchHistoryInput = {
  create?: Array<Prisma.SearchHistoryCreateWithoutUserInput>;
};

export const createNewUserAccount = async (signUpData: SignUpDataType) => {
  try {
    const result = await db.user.create({
      data: {
        email: signUpData.email,
        name: `${signUpData.firstname} ${signUpData.lastname}`,
        password: String(await bcrypt.hash(signUpData.password, 10)),
        createdAt: new Date(),
        updatedAt: new Date(),
        history: { create: [] } as SearchHistoryInput,
      },
    });

    if (result) {
      console.log("the new user: ", result);
      return true;
    } else return false;
  } catch (error) {
    console.log("Failed to create new user account: ", error);
    throw error;
  }
};

export const isUserRegistered = async (emailQuery: string) => {
  try {
    const result = await db.user.findUnique({
      where: {
        email: emailQuery,
      },
    });

    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Failed to check email in db: ", error);
    throw error;
  }
};
