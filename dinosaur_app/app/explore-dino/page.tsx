"use client";

import React, { useEffect, useState } from "react";
import { DinoDataType } from "../lib/definitions";
import Dinocard from "./ui/Dinocard";

import { getAllDinousars } from "../lib/utils";

import SearchBar from "./ui/SearchBar";
import Loading from "../ui/Loading";
import Filter from "./ui/Filter";
import { filterCountries } from "../lib/constants";

const ExploreDino = ({
  searchParams,
}: {
  searchParams?: { name: string; foundIn: string };
}) => {
  const [dinausors, setDinousars] = useState<DinoDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const name = searchParams?.name || "";
  const foundIn = searchParams?.foundIn || "";

  useEffect(() => {
    const fetchDinosaurs = async () => {
      setLoading(true);
      try {
        const dinausors = await getAllDinousars({ name, foundIn });
        setDinousars(dinausors);
      } catch (error) {
        console.log("Failed to fetch dinausors: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDinosaurs();
  }, [name, foundIn]);

  return (
    <main className="flex flex-col  justify-center items-center pt-4 gap-y-8">
      <div className="flex gap-x-4">
        <SearchBar />
        <Filter
          placeholder="Countries"
          filterOptions={filterCountries}
          paramValue="foundIn"
        />
      </div>
      <div
        className={
          loading
            ? "flex justify-center items-center min-h-screen"
            : `grid  grid-flow-row md:grid-cols-2 md:gap-x-6 xl:grid-cols-3  gap-y-6 lg:gap-x-8`
        }
      >
        {loading ? (
          <Loading />
        ) : name.length > 0 && dinausors.length === 0 ? (
          <div className="text-3xl font-bold text-orange-600 text-center">
            No Dinosours found
          </div>
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
