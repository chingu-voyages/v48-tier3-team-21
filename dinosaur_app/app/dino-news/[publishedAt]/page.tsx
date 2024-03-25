import { fetchLatestNews, formatDate } from "@/app/lib/utils";
import Image from "next/image";
import { Suspense } from "react";
import BackButton from "../ui/BackButton";
import clsx from "clsx";

interface DinoNewsProp {
  params: {
    publishedAt: string;
  };
}

const Page = async ({ params }: Readonly<DinoNewsProp>) => {
  const publishedAtString = params.publishedAt;
  // Access and format timestamp if available
  const verifiedPublishedAt =
    decodeURIComponent(publishedAtString) ?? "Unknown";

  let specificNews = null;
  if (verifiedPublishedAt) {
    const dinoNews = await fetchLatestNews();
    specificNews = await dinoNews.find(
      (news) => news.publishedAt == verifiedPublishedAt
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="w-3/4 p-20 max-md:p-8 flex flex-col gap-5 bg-white text-black">
        <BackButton />
        <div className=" w-full flex flex-row max-md:flex-col md:items-center md:justify-between">
          <span className=" bg-orange-400 p-2 rounded-md font-semibold">
            {specificNews?.source.name}
          </span>
          <span>{formatDate(specificNews?.publishedAt)}</span>
        </div>
        <hr />
        <div className="w-full flex flex-row items-center justify-between">
          <span>
            Author:{" "}
            <span className=" font-bold">
              {specificNews?.author || "Anonymous Author"}
            </span>
          </span>
          <a
            href={specificNews?.url}
            target="_blank"
            className=" p-3 rounded-md border-2 border-orange-300 hover:border-orange-400 hover:text-orange-300"
          >
            Website
          </a>
        </div>
        <h1 className="text-5xl max-lg:text-2xl font-bold mt-3">
          {specificNews?.title}
        </h1>

        <p className="text-md">{specificNews?.description}</p>

        <Image
          src={specificNews?.urlToImage}
          alt={`news image: ${specificNews?.title}`}
          width={1400}
          height={1000}
          className={clsx("w-auto object-contain", {
            hidden: !specificNews,
          })}
        />

        <p>{specificNews?.content}</p>
      </main>
    </Suspense>
  );
};

export default Page;
