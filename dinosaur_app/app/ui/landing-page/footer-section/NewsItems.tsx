import { fetchLatestNews } from "@/app/lib/utils";
import { Link2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NewsItems = async () => {
  const availableNews = await fetchLatestNews();

  return (
    <div className=" w-full flex flex-row gap-5 overflow-hidden hover:overflow-x-auto sm:px-5">
      {availableNews?.map((news: any) => (
        <div
          key={news.urlToImage}
          className="w-[300px] max-sm:w-[200px] h-[200px] max-sm:h-[150px] rounded-md bg-white shrink-0 z-0 relative hover:border border-orange-400"
        >
          <Image
            src={news.urlToImage || ""}
            alt={news.title}
            fill
            className=" absolute inset-0 z-10 rounded-md"
          />
          <Link
            href={`/dino-news/${news.publishedAt}`}
            className="absolute top-3 right-2 z-30 flex text-white rounded-md gap-2 items-center bg-black bg-opacity-80 p-2 hover:scale-105 hover:bg-opacity-100 transition-all duration-500 ease-linear"
          >
            view <Link2Icon />
          </Link>
          <p className="absolute bg-gradient-to-b from-transparent via-transparent to-black w-full h-full z-20 flex flex-col justify-end p-3 ">
            <span className="text-white max-md:text-orange-400 font-semibold w-full h-20 overflow-hidden text-ellipsis md:hover:text-orange-400 transition-colors duration-300 ease-in">
              {news.title}
            </span>
          </p>
        </div>
      ))}
      ;
    </div>
  );
};

export default NewsItems;
