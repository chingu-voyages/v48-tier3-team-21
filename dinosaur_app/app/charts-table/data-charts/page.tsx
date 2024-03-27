"use client";
import PageLoading from "@/app/ui/PageLoading";
import Chart from "chart.js/auto";
import { Suspense, useEffect, useState } from "react";

const data = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
];

type DietDataType = {
  diet: string;
  count: number;
};

type EraDataType = {
  era: string;
  dietData: DietDataType[];
};

const ChartsPage = () => {
  const [dietData, setDietData] = useState<DietDataType[] | null>(null);
  const [eraData, setEraData] = useState<EraDataType[] | null>(null);

  useEffect(() => {
    let doughnutChart = null;
    let pieChart = null;
    let stackedBarChart = null;

    async function fetchDietData() {
      try {
        const response = await fetch("/api/charts-table/get-charts-data");

        if (response.status === 200) {
          const data = await response.json();
          setDietData(data.dietData);
          setEraData(data.eraData);
        } else if (response.status === 500) {
          alert("Internal system error!");
        }
      } catch (error) {
        console.log("Failed to fetch diet data");
        alert("Check your internet connection and try again!");
      }
    }

    if (dietData === null) {
      fetchDietData();
    }

    function processDietData(eraData: EraDataType[]) {
      if (!eraData) return []; // Handle no data case

      // Extract unique diet types from the data
      const uniqueDiets = new Set(
        eraData.flatMap((era: any) => era.dietData.map((d: any) => d.diet))
      );

      const datasets = Array.from(uniqueDiets).map((diet) => ({
        label: diet,
        data: eraData.map((era: any) => {
          const dietData = era.dietData.find((d: any) => d.diet === diet);
          return dietData ? dietData.count : 0; // Handle missing data points
        }),
      }));

      return datasets;
    }

    stackedBarChart = new Chart(
      document.getElementById("stackedBarChart") as any,
      {
        type: "bar",
        data: {
          labels: eraData?.map((row) => row.era),
          datasets: processDietData(eraData || []),
        },
        options: {
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        },
      }
    );

    doughnutChart = new Chart(document.getElementById("doughnutChart") as any, {
      type: "doughnut",
      data: {
        labels: dietData?.map((row: any) => row.diet),
        datasets: [
          {
            label: "Count per Diet",
            data: dietData?.map((row: any) => row.count),
          },
        ],
      },
    });

    pieChart = new Chart(document.getElementById("pieChart") as any, {
      type: "pie",
      data: {
        labels: dietData?.map((row: any) => row.diet),
        datasets: [
          {
            label: "Count by Diet",
            data: dietData?.map((row: any) => row.count),
          },
        ],
      },
    });

    return () => {
      if (doughnutChart) {
        doughnutChart.destroy();
      }
      if (pieChart) {
        pieChart.destroy();
      }
      if (stackedBarChart) {
        stackedBarChart.destroy();
      }
    };
  }, [dietData]);

  return (
    <Suspense fallback={<PageLoading />}>
      <main className="w-full bg-white min-h-[50vh] flex flex-col p-20 gap-20">
        <h1 className=" font-cabinSketch text-5xl max-md:text-3xl">
          Dinosaur Count:
        </h1>
        {/* pie and doughnut chart */}
        <div className="w-full flex flex-col gap-3 items-center">
          <span className=" font-cabinSketch text-xl md:text-md">
            ~ Classification by Diet:
          </span>
          <div className="w-full max-md:p-10 flex flex-row max-md:flex-col md:justify-center items-center gap-16 max-md:gap-5">
            <div className="w-[300px]">
              <canvas id="doughnutChart"></canvas>
            </div>
            <div className="w-[300px]">
              <canvas id="pieChart"></canvas>
            </div>
          </div>
        </div>

        {/* stacked bar chart */}
        <div className="w-full flex flex-col gap-3 items-center">
          <span className=" text-start font-cabinSketch text-xl md:text-md">
            ~ Classification by Era and Diet:
          </span>
          <div className="w-[600px] max-md:w-[300px]">
            <canvas id="stackedBarChart"></canvas>
          </div>
        </div>
      </main>
    </Suspense>
  );
};

export default ChartsPage;
