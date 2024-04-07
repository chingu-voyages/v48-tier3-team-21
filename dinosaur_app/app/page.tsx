import { Suspense } from "react";
import LandingPage from "./ui/landing-page/LandingPage";
import PageLoading from "./ui/PageLoading";

export default async function Home() {
  return (
    <main className=" w-full bg-white">
      <Suspense fallback={<PageLoading />}>
        <LandingPage />
      </Suspense>
    </main>
  );
}
