"use client";

import React, { useEffect, useState } from "react";
import { DinoDataType } from "../lib/definitions";
import Dinocard from "./ui/Dinocard";
import { useSearchParams, usePathname } from "next/navigation";
import { getAllDinousars } from "../lib/utils";

import SearchBar from "./ui/SearchBar";
import Loading from "./ui/Loading";

const ExploreDino = () => {
  const [dinausors, setDinousars] = useState<DinoDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const fetchDinosaurs = async () => {
      setLoading(true);
      try {
        const dinausors = await getAllDinousars();
        setDinousars(dinausors);
      } catch (error) {
        console.log("Failed to fetch dinausors: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDinosaurs();
  }, []);

  return (
    <main className="flex flex-col  justify-center items-center pt-4 gap-y-8">
      <SearchBar />
      <div
        className={
          loading
            ? "flex justify-center items-center min-h-screen"
            : `grid  grid-flow-row md:grid-cols-2 md:gap-x-6 xl:grid-cols-3  gap-y-6 lg:gap-x-8`
        }
      >
        {loading ? (
          <Loading />
        ) : (
          dinausors?.map((dino) => {
            return (
              <Dinocard
                key={dino.id}
                id={dino.id}
                name={dino.name}
                location={dino.foundIn}
                imageSrc={dino.imageSrc}
                description={dino.description}
              />
            );
          })
        )}
      </div>
    </main>
  );
};

export default ExploreDino;
