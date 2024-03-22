import React from "react";
import { DinoDataType } from "../lib/definitions";
import Dinocard from "./ui/Dinocard";

const ExploreDino = async () => {
  const dinausors =
    (await fetch("https://chinguapi.onrender.com/dinosaurs")) || [];
  const resp: DinoDataType[] = await dinausors.json();

  return (
    <main className="flex justify-center items-center pt-4">
      <div className="grid  grid-flow-row md:grid-cols-2 md:gap-x-6 xl:grid-cols-3  gap-y-6 lg:gap-x-8">
        {resp?.map((dino) => {
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
        })}
      </div>
    </main>
  );
};

export default ExploreDino;
