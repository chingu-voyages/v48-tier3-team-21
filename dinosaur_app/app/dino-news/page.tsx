import Link from "next/link";
import { fetchLatestNews, formatDate } from "../lib/utils";
import Image from "next/image";
import { Suspense } from "react";
import PageLoading from "../ui/PageLoading";

const DinoNewsPage = async () => {
  const dinoNews = await fetchLatestNews();

  return (
    <Suspense fallback={<PageLoading />}>
      <main className="w-full bg-white p-20 max-md:p-8 flex flex-col gap-5">
        <h1 className=" text-8xl max-md:text-3xl max-lg:text-5xl font-bold">
          Dig Up the Latest! Dinosaur News and Information
        </h1>

        <h2 className=" text-3xl max-md:text-lg max-lg:text-xl font-light italic ">
          Dive into the exciting world of dinosaurs! Find news about fossils,
          research, and everything that makes these giants roar. From the worlds
          best sources and inquisitive publishers all over the world.
        </h2>

        <div className="w-full flex flex-col gap-10">
          {dinoNews?.map((news: any) => (
            <div
              key={news.publishedAt}
              className="w-full p-3 rounded-lg hover:shadow-black hover:shadow-lg transition-all duration-500 ease-linear bg-gradient-to-br from-transparent via-black to-black border-4 border-orange-400 border-t-0 border-l-0 flex flex-row max-lg:flex-col gap-8 relative"
            >
              <Image
                key={news.publishedAt}
                src={news.urlToImage}
                alt={`news image: ${news.title}`}
                width={1400}
                height={1000}
                loading="lazy"
                className=" w-1/4 max-lg:w-full h-[400px] max-md:h-[200px] shrink-0 "
              />
              <div className=" grow flex flex-col gap-2 text-white lg:max-h-[350px]">
                <p className=" w-full flex flex-row max-md:flex-col md:items-center md:justify-between">
                  <span className=" bg-orange-400 p-2 rounded-md font-semibold">
                    {news.source.name}
                  </span>
                  <span>{formatDate(news.publishedAt)}</span>
                </p>

                <span className="text-5xl max-lg:text-2xl font-bold mt-3">
                  {news.title}
                </span>

                <p className=" text-md mt-5">{news.description}</p>

                <Link
                  href={`/dino-news/${news.publishedAt}/?scroll=true`}
                  className=" lg:absolute lg:bottom-2 lg:right-2 w-[200px] font-extrabold bg-orange-300 hover:bg-orange-400 p-3 rounded-lg max-lg:self-end text-center"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Suspense>
  );
};

export default DinoNewsPage;
