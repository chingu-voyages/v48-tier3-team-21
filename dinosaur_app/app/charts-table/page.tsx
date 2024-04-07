import dataChartIcon from "@/public/data-chart-icon.svg";
import dataTableIcon from "@/public/data-table-icon.svg";
import Link from "next/link";
import Image from "next/image";
import { fetchDinoData } from "../lib/utils";

const page = async () => {
  return (
    <main className="w-full min-h-[90vh] flex flex-col gap-10 max-md:gap-2 bg-white text-black p-16 max-md:px-5">
      <h1 className=" text-7xl max-md:text-3xl font-cabinSketch text-center">
        Dino Data Charts and Tables
      </h1>
      <h2 className=" w-3/4 max-md:w-full text-start text-3xl max-md:text-xl font-semibold mt-5">
        Navigate through the relative data that was aquired in Dinosaur
        exploration search, discovery and digging.
      </h2>
      <p className=" w-3/4 max-md:w-full text-sm font-light text-start">
        We have represented data into charts and tables. Available{" "}
        <Link href={"#charts-icon"} className="font-bold">
          Data charts
        </Link>{" "}
        are doughnut and pie charts showcasing the dinosaur classification by
        diet, and further classification of dino data as diet by existence era,
        with a spectrum and bar charts.
        <br />
        For{" "}
        <Link href={"#tables-icon"} className="font-bold">
          Data tables
        </Link>{" "}
        we show all relative data about dinos with column classifications by
        name, weight, length, country and diet per discovered dinosaur.
      </p>

      <section className="w-full flex flex-row justify-center items-center gap-10 md:px-20">
        <Link
          id="charts-icon"
          href={"/charts-table/data-charts"}
          className=" md:w-[300px] flex flex-col items-center md:gap-4 p-3 rounded-lg hover:shadow-md border-2 border-black hover:outline-4 hover:-outline-offset-8 hover:outline-dashed hover:outline-orange-400 transition-all duration-300 ease-linear"
        >
          <Image
            src={dataChartIcon}
            alt="click to navigate to dino data charts view"
            width={1400}
            height={1000}
            className="w-auto max-md:w-[150px]"
          />
          <span className=" p-3 font-bold text-white bg-orange-300 hover:bg-orange-400 rounded-sm transition-all duration-300 ease-linear text-center">
            View <br className="md:hidden" /> Data Charts
          </span>
        </Link>

        <Link
          id="tables-icon"
          href={"/charts-table/data-charts"}
          className=" md:w-[300px] flex flex-col items-center md:gap-4 p-3 rounded-lg hover:shadow-md border-2 border-black hover:outline-4 hover:-outline-offset-8 hover:outline-dashed hover:outline-orange-400 transition-all duration-300 ease-linear"
        >
          <Image
            src={dataTableIcon}
            alt="click to navigate to dino data charts view"
            width={1400}
            height={1000}
            className="w-auto max-md:w-[150px]"
          />
          <span className=" p-3 font-bold text-white bg-orange-300 hover:bg-orange-400 rounded-sm transition-all duration-300 ease-linear text-center">
            View <br className="md:hidden" /> Data Tables
          </span>
        </Link>
      </section>
    </main>
  );
};

export default page;
