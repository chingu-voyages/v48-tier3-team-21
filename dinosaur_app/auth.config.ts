import type { NextAuthConfig } from "next-auth";
import { signOut } from "./auth";
import { createNewUserAccount, isUserRegistered } from "./app/lib/database";
import { SignUpDataType } from "./app/lib/definitions";
import { resolve } from "path";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDinoNews = nextUrl.pathname.startsWith("/dino-news");
      const isOnExploreDino = nextUrl.pathname.startsWith("/explore-dino");
      const isOnChartsTable = nextUrl.pathname.startsWith("/charts-table");
      const isLoginPage = nextUrl.pathname.startsWith("/login");
      const query = new URLSearchParams(nextUrl.search);
      const intendedURL = query.get("callbackUrl");

      if (isOnDinoNews || isOnExploreDino || isOnChartsTable) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (
        isLoginPage &&
        intendedURL !== undefined &&
        intendedURL !== null
      ) {
        if (isLoggedIn) return Response.redirect(new URL(intendedURL));
      }

      // Logged in users are authenticated, otherwise redirect to login page
      return true;
    },
    async signIn({ account, profile }): Promise<any> {
      if (account?.provider === "google" && profile?.email) {
        try {
          // const userExists = await isUserRegistered(profile?.email);
          // if (!userExists) {
          //   const signUpData: SignUpDataType = {
          //     email: String(profile.email),
          //     firstname: String(profile.given_name?.split(" ")[0]),
          //     lastname: String(profile.family_name),
          //     password: String("gmail"),
          //   };
          //   const confirmation = await createNewUserAccount(signUpData);
          //   if (confirmation) {
          //     return profile.email_verified;
          //   }
          // } else {
          //   return profile?.email_verified;
          // }
        } catch (error) {
          console.log("Failed to register new google user to db: ", error);
          return false;
        }
        return profile?.email_verified;
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
