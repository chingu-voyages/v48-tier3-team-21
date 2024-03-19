import Image from "next/image";
import dinoIcon from "@/public/dino_icon.svg";
import githubIcon from "@/public/github-icon/github-mark/github-mark-white.svg";
import Link from "next/link";
import NewsItems from "./NewsItems";
import { developers } from "@/app/lib/constants";

const FooterSection = async () => {
  return (
    <section className="w-full h-[70%] bg-black mt-16 p-3 px-10 max-md:px-6 flex flex-row max-md:flex-col gap-3">
      <div className="w-[1/4] max-md:w-full max-md:flex items-center gap-3">
        <Image
          src={dinoIcon}
          alt=""
          width={200}
          height={200}
          loading="lazy"
          className=" max-md:w-[100px] max-md:h-[100px] border-4 border-white rounded-md bg-orange-300"
        />

        <span className=" font-cabinSketch text-white text-xl">
          Digging Into Dinosaurs
        </span>
      </div>
      <div className="grow md:h-full border border-gray-400 border-t-0 border-r-0 rounded-r-none rounded-t-none rounded-lg flex flex-col gap-2 p-1 px-5 max-md:px-2 overflow-hidden">
        {/* News section */}
        <div style={{ zIndex: 500 }} className="w-full">
          <span className=" text-white font-bold text-lg">Dino News: </span>
          <NewsItems />
        </div>

        <div className="w-full flex flex-row max-lg:flex-col max-lg:gap-8 shrink-0 justify-between">
          {/* mention app developers section */}
          <div
            id="developers-mention"
            className="max-lg:w-full w-[30%] h-full max-md:h-[50%] overflow-hidden overflow-y-auto flex flex-col shrink-0 relative md:px-2"
          >
            <label
              htmlFor="developers-mention"
              className=" text-white font-bold text-lg sticky top-0 bg-black"
            >
              Developed by:{" "}
            </label>
            {developers.map((developer) => (
              <div
                className="w-full h-14 flex justify-between shrink-0 items-center transition-transform duration-500 ease-out hover:px-1"
                key={developer.name}
              >
                <Image
                  src={developer.avatar}
                  alt={`Image Icon of ${developer.name}`}
                  width={1350}
                  height={768}
                  loading="lazy"
                  className=" w-10 h-10 rounded-full border border-white shrink-0"
                />

                <span className=" mx-3 text-start w-full text-sm flex flex-col justify-center">
                  <span className="text-white font-bold text-lg -mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    {developer.name}
                  </span>
                  <span className="text-sm text-gray-400">
                    {developer.role}
                  </span>
                </span>
                <a href={developer.github}>
                  <Image
                    src={githubIcon}
                    alt={`click to navigate to the GitHub account of ${developer.name}`}
                    width={40}
                    height={40}
                    className="w-[30px] h-[30px] mr-2 hover:border-2 hover:border-white rounded-full"
                  />
                </a>
              </div>
            ))}
          </div>

          {/* Resourceful links */}
          <ul
            id="resourceful-links"
            className="max-md:w-full flex flex-col tex-white gap-2 list-disc list-inside"
          >
            <label
              htmlFor="resourceful-links"
              className="text-white font-bold text-lg sticky top-0 bg-black"
            >
              Resourceful Links:{" "}
            </label>
            <a
              href="https://www.nhm.ac.uk/discover/dinosaurs.html"
              target="_blank"
              className="hover:text-white hover:underline underline-offset-3 text-gray-500 transition-colors duration-500 ease-linear list-item"
            >
              National History Museum
            </a>
            <a
              href="https://chinguapi.onrender.com/dinosaurs"
              target="_blank"
              className="hover:text-white hover:underline underline-offset-3 text-gray-500 transition-colors duration-500 ease-linear list-item"
            >
              Dinosaurs API
            </a>
            <a
              href="https://newsapi.org/"
              target="_blank"
              className="hover:text-white hover:underline underline-offset-3 text-gray-500 transition-colors duration-500 ease-linear list-item"
            >
              NewsAPI
            </a>
          </ul>

          <div className="max-md:w-full flex flex-col justify-between lg:pb-5 max-lg:gap-10">
            {/* acknowlegdements */}
            <li id="acknowledgements" className=" flex flex-col list-inside">
              <label
                htmlFor="acknowledgements"
                className=" text-white font-bold text-lg sticky top-0 bg-black"
              >
                Acknowledgements:{" "}
              </label>
              <a
                href="https://www.chingu.io/"
                target="_blank"
                className="hover:text-white hover:underline underline-offset-3 text-gray-500 transition-colors duration-500 ease-linear list-item"
              >
                Chingu.io
              </a>
              <a
                href="https://portfolio.jaweki.com/"
                target="_blank"
                className="hover:text-white hover:underline underline-offset-3 text-gray-500 transition-colors duration-500 ease-linear list-item"
              >
                Jaweki Blog
              </a>
            </li>

            {/* privacy policy */}
            <div className="w-full flex flex-col text-white max-lg:text-end">
              <Link href="/extras/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="/extras/terms-conditions" className="hover:underline">
                Terms & Conditions
              </Link>
              <span> &copy; {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
