import type { NextAuthConfig } from "next-auth";
import { SearchHistoryInput } from "./app/lib/database";
import { db } from "./lib/db";

export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login/error",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isUndefinedPath = nextUrl.pathname.startsWith("/undefined");
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
      } else if (isUndefinedPath) {
        return Response.redirect(new URL("/login/error", nextUrl));
      }

      // Logged in users are authenticated, otherwise redirect to login page
      return true;
    },
    async signIn({ account, profile }): Promise<any> {
      if (account?.provider === "google") {
        if (profile?.email_verified) {
          const result = await db.user.findUnique({
            where: {
              email: String(profile.email),
            },
          });

          if (!result) {
            const confirmation = await db.user.create({
              data: {
                email: String(profile.email),
                name: String(profile.name),
                password: null,
                createdAt: new Date(),
                updatedAt: new Date(),
                history: { create: [] } as SearchHistoryInput,
                emailVerified: profile.email_verified,
              },
            });
            if (!confirmation) {
              return false;
            }
          } else {
            return true;
          }
        } else {
          return false;
        }
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
