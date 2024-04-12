import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "mapbox-gl/dist/mapbox-gl.css";
import "./ui/globals.css";
import MainHeader from "./ui/MainHeader";
import FooterSection from "./ui/landing-page/footer-section/FooterSection";
import Provider from "./ui/next-auth-client/Provider";
import RandomFactPopUp from "./ui/RandomFactPopUp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digging Into Dino",
  description:
    " Dinosaurs first appeared between 247 and 240 million years ago. They ruled the Earth for about 175 million years until an extinction event 65.5 million years ago wiped out all of them, except for the avian dinosaurs. Scientists don't agree entierly on what happened, but the extinction likely was a double or triple whammy involving an asteroid impact, chocking chemicals from erupting volcanoes, climate change and possibly other factors. Utilizing data from public sources like Kaggle & Tableau, we've created an interactive website for all the fun facts we found in the data about dinosaurs! See where and when they lived, what they ate, and individual dinosaur facts! When you're done, be sure and visit the American Museum of Natural History for more fun dinosaur facts.",
  metadataBase: new URL("https://digging-into-dinosours.vercel.com/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Provider>
          <MainHeader />
          <RandomFactPopUp />
          {children}
          <FooterSection />
        </Provider>
      </body>
    </html>
  );
}
