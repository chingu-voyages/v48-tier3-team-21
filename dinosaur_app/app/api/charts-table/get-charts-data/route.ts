import { fetchDinoData } from "@/app/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        const dinoData = (await fetchDinoData()) || [];

        if (!dinoData) {
            throw new Error("No dino data");
        }

        const dietData = [
          {
            diet: "carnivorous",
            count: 0,
          },
          {
            diet: "omnivorous",
            count: 0,
          },
          {
            diet: "herbivorous",
            count: 0,
          },
        ];

        const eraData = [
            {
                era: "cretaceous",
                dietData: [
                    {
                      diet: "carnivorous",
                      count: 0,
                    },
                    {
                      diet: "omnivorous",
                      count: 0,
                    },
                    {
                      diet: "herbivorous",
                      count: 0,
                    },
                  ]
            },
            {
                era: "jurassic",
                dietData: [
                    {
                      diet: "carnivorous",
                      count: 0,
                    },
                    {
                      diet: "omnivorous",
                      count: 0,
                    },
                    {
                      diet: "herbivorous",
                      count: 0,
                    },
                  ]
            },
            {
                era: "triassic",
                dietData: [
                    {
                      diet: "carnivorous",
                      count: 0,
                    },
                    {
                      diet: "omnivorous",
                      count: 0,
                    },
                    {
                      diet: "herbivorous",
                      count: 0,
                    },
                  ]
            },
        ];

        dinoData.forEach(data => {
            if (data.whenLived.toLowerCase().includes("cretaceous")) {
                if (data.diet.includes("herbivorous")) {
                    eraData[0].dietData[2].count++;
                } else if (data.diet.includes("omnivorous")) {
                    eraData[0].dietData[1].count++;
                } else if (data.diet.includes("carnivorous")) {
                    eraData[0].dietData[0].count++;
                }
            } else if (data.whenLived.toLowerCase().includes("jurassic")) {
                if (data.diet.includes("herbivorous")) {
                    eraData[1].dietData[2].count++;
                } else if (data.diet.includes("omnivorous")) {
                    eraData[1].dietData[1].count++;
                } else if (data.diet.includes("carnivorous")) {
                    eraData[1].dietData[0].count++;
                }
            } else if (data.whenLived.toLowerCase().includes("triassic")) {
                if (data.diet.includes("herbivorous")) {
                    eraData[2].dietData[2].count++;
                } else if (data.diet.includes("omnivorous")) {
                    eraData[2].dietData[1].count++;
                } else if (data.diet.includes("carnivorous")) {
                    eraData[2].dietData[0].count++;
                }
            }
        });
        
        dinoData.forEach((data) => {
          if (data.diet.includes("herbivorous")) {
            dietData[2].count = dietData[2].count + 1;
          } else if (data.diet.includes("omnivorous")) {
            dietData[1].count = dietData[1].count + 1;
          } else if (data.diet.includes("carnivorous")) {
            dietData[0].count = dietData[0].count + 1;
          }
        });
    
        return new NextResponse(JSON.stringify({dietData, eraData}), { status: 200});

    } catch (error) {
        console.log("Failed to fetch dino diet: ", error);
        return new NextResponse(JSON.stringify({ message: error }), { status: 500 });
    }
}