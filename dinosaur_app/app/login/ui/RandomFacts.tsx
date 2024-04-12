import React, { useEffect, useState } from "react";
import { randomFacts } from "@/app/lib/constants";

const RandomFacts = () => {
  const [fact, setFact] = useState<string | null>(null); // Store the random fact

  useEffect(() => {
    const index = Math.floor(Math.random() * randomFacts.length);
    setFact(randomFacts[index]);
  }, []); // Empty dependency array to fetch fact only once

  return (
    <div className="w-full p-3 flex flex-col gap-2">
      <span className="text-xl font-bold bg-gradient-to-r from-white via-orange-300 to-orange-400 bg-clip-text text-transparent border-b-2 border-orange-400">
        Random Dinosaur Fact
      </span>
      {fact && <span>{fact}</span>} {/* Only display fact if fetched */}
    </div>
  );
};

export default RandomFacts;
