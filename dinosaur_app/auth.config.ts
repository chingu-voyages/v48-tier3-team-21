import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDinoNews = nextUrl.pathname.startsWith("/dino-news");
      const isOnExploreDino = nextUrl.pathname.startsWith("/explore-dino");
      const isOnChartsTable = nextUrl.pathname.startsWith("/charts-table");
      const isGoogleResponse = nextUrl.pathname.startsWith(
        "/api/auth/callback/google"
      );

      if (isGoogleResponse) {
        console.log("Google login message: ");
        return Response.redirect(new URL("/extras/about-us", nextUrl));
      }

      if (isOnDinoNews || isOnExploreDino || isOnChartsTable) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
    async signIn({ user, account, profile }): Promise<any> {
      if (account?.provider === "google") {
        console.log("user: ", JSON.stringify(user));
        console.log("user profile: ", JSON.stringify(profile));
        return "http:localhost:3000/explore-dino";
      }
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
