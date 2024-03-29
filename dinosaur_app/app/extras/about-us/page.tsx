import { developers } from "@/app/lib/constants";
import PageLoading from "@/app/ui/PageLoading";
import { LinkedinIcon } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import githubIcon from "@/public/github-icon/github-mark/github-mark.svg";
import websiteIcon from "@/public/web-icon.png";

const AboutUsPage = () => {
  return (
    <main className="w-full min-h-[50vh] flex flex-col p-8 bg-white text-black">
      <Suspense fallback={<PageLoading />}>
        <h1 className="w-full text-start font-extrabold">About Us:</h1>
        <h2 className=" text-center text-8xl max-sm:text-3xl max-md:text-5xl max-lg:text-6xl font-cabinSketch">
          Meet The Team Behind Development of <br />
          <strong>Digging Into Dinosaurs</strong>
        </h2>

        <section className="lg:p-20 md:p-0 mt-10 flex flex-col">
          <label htmlFor="overview" className=" font-bold text-lg">
            Overview
          </label>
          <p id="overview">
            This web app is an intresting project that was conceptualized by the
            administration of{" "}
            <a
              href="https://www.chingu.io/"
              target="_blank"
              className=" text-blue-600 font-bold underline underline-offset-2"
            >
              chingu.io
            </a>{" "}
            and was developed by a team of enthusiastic individuals who actively
            engage in applying modern day software related standards in their
            work roles. They where matched in an online program at chingu known
            as a voyage and during voyage 48, a team of 5 developers were tasked
            with the creation of this web app. The team is a tier 3 team,
            meaning they were 4 Full-Stack Developers and one UI/UX designer
            engaged in team work.
          </p>
          <br />
          <label htmlFor="development_process" className=" font-bold text-lg">
            Development Process
          </label>
          <p id="development_process">
            Development process involved following the Agile Software
            developement Methodology, mainly observing the Scrum pattern to
            determine which tasks to execute and when to execute them. Through
            out the voyage there were sprints and sprint activities that were
            organized as follows:
          </p>
          <ul className=" list-disc list-inside md:pl-5 mt-5 grid md:grid-cols-2 grid-cols-1 gap-10 max-md:gap-5">
            <li className=" list-item border border-orange-300 hover:border-orange-400 shadow-md shadow-black  rounded-lg p-3">
              <label htmlFor="sprint_1" className=" font-semibold">
                Sprint 1
              </label>
              <ol id="sprint_1" className=" list-inside list-decimal pl-5">
                <li>
                  Initial team member introduction and schdule of kickoff
                  meeting
                </li>
                <li>Conduct kickoff meeting</li>
                <li>Choosing of a project and creation of a Vison Statement</li>
                <li>Definition of the MVP priority features</li>
              </ol>
            </li>
            <li className=" list-item border border-orange-300 hover:border-orange-400 shadow-md shadow-black rounded-lg p-3">
              <label htmlFor="sprint_2" className=" font-semibold">
                Sprint 2
              </label>
              <ol id="sprint_2" className=" list-inside list-decimal pl-5">
                <li>Setting up of product Backlog</li>
                <li>Creation of a low-fidelity wireframe</li>
                <li>Setting up of the team GitHub workflow</li>
              </ol>
            </li>
            <li className=" list-item border border-orange-300 hover:border-orange-400 shadow-md shadow-black rounded-lg p-3">
              <label htmlFor="sprint_3-5" className=" font-semibold">
                Sprint 3-5
              </label>
              <ol id="sprint_3-5" className=" list-inside list-decimal pl-5">
                <li>Design</li>
                <li>Develop</li>
                <li>Test</li>
                <li>Deploy to production</li>
              </ol>
            </li>
            <li className=" list-item border border-orange-300 hover:border-orange-400 shadow-md shadow-black rounded-lg p-3">
              <label htmlFor="sprint_6" className=" font-semibold">
                Sprint 6
              </label>
              <ol id="sprint_6" className=" list-inside list-decimal pl-5">
                <li>Project Closure</li>
                <li>Celebrate Team Success</li>
              </ol>
            </li>
          </ul>
        </section>

        <h3 className="w-full text-3xl font-bold text-center">
          Development Team: {developers.length} members
        </h3>
        <section className="flex flex-col items-center snap-y snap-mandatory h-[100vh] overflow-hidden overflow-y-auto">
          <Suspense fallback={<PageLoading />}>
            {developers.map((developer) => (
              <div
                key={developer.name}
                className="flex flex-row max-md:flex-col items-center justify-center w-full h-[100vh] snap-proximity snap-center snap-always shrink-0 gap-5 md:gap-10"
              >
                {developer.avatar.startsWith("https://") ? (
                  <Image
                    src={developer.avatar}
                    alt={`profile avatar of ${developer.name}`}
                    width={2400}
                    height={2000}
                    loading="lazy"
                    className=" w-[300px] h-[300px] max-md:w-[150px] max-md:h-[150px] rounded-full object-fill"
                  />
                ) : (
                  <div className=" w-[300px] h-[300px] max-md:w-[150px] max-md:h-[150px] rounded-full bg-orange-400 flex items-center justify-center">
                    {" "}
                    <span className="text-lg font-bold text-center text-white">
                      No Avatar
                    </span>{" "}
                  </div>
                )}

                <div className="max-md:w-full w-1/2 flex flex-col gap-2 max-md:p-8">
                  <span className=" font-bold">Hello, am {developer.name}</span>
                  <span>my team role: {developer.role}</span>
                  <p>{developer.description}</p>
                  <div className="flex flex-row items-center gap-5">
                    <a href={developer.linked_in} target="_blank">
                      <LinkedinIcon className="w-8 h-8" />
                    </a>
                    <a href={developer.github} target="_blank">
                      <Image
                        src={githubIcon}
                        alt="click to navigate to my github account"
                        width={1000}
                        height={1000}
                        className="w-8 h-8"
                      />
                    </a>
                    <a href={developer.website} target="_blank">
                      <Image
                        src={websiteIcon}
                        alt="click to navigate to my personal website"
                        width={1000}
                        height={1000}
                        className="w-8 h-8"
                      />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Suspense>
        </section>
      </Suspense>
    </main>
  );
};

export default AboutUsPage;
