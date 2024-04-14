"use client";
import clsx from "clsx";
import { LogOutIcon, User2Icon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Suspense, useEffect, useState, useContext } from "react";
import SearchHistoryItem from "./SearchHistoryItem";
import Link from "next/link";
import Loading from "./Loading";
import { AppContext } from "./AppContext";

const UserProfileButton = () => {
  const { data: session, status } = useSession();
  const [isSessionCardOpen, setIsSessionCardOpen] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[] | null>(null);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const [searchUnderDelete, setSearchUnderDelete] = useState<string | null>(
    null
  );
  const { refreshSearchHistoryView, setRefreshSearchHistoryView } =
    useContext(AppContext);

  useEffect(() => {
    const sessionCard = document.getElementById(
      "user-session-card"
    ) as HTMLDivElement;

    const handleMouseEnter = (event: MouseEvent) => {
      setIsSessionCardOpen(true);
      setTimeout(() => {
        setShowButtons(true);
      }, 500);
    };

    const handleMouseLeave = (event: MouseEvent) => {
      setTimeout(() => {
        setShowButtons(false);
        setTimeout(() => {
          setIsSessionCardOpen(false);
        }, 600);
      }, 3000);
    };

    if (status === "authenticated" && sessionCard) {
      sessionCard.addEventListener("mouseenter", handleMouseEnter);
      sessionCard.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (status === "authenticated" && sessionCard) {
        sessionCard.removeEventListener("mouseenter", handleMouseEnter);
        sessionCard.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isSessionCardOpen, status]);

  useEffect(() => {
    async function getHistory() {
      try {
        const url = "/api/user/get-history";
        const response = await fetch(url);

        if (response.status === 200) {
          const data = await response.json();
          const searchHistory = data.userSearchHistory;
          if (searchHistory) {
            setRefreshSearchHistoryView(false);
            setSearchHistory(searchHistory);
          } else {
            setSearchHistory(null);
          }
        }
      } catch (error) {
        console.log("Failed to get User Search History: ", error);
      }
    }

    if (status === "authenticated" || refreshSearchHistoryView) {
      getHistory();
    }
  }, [refreshSearchHistoryView, setRefreshSearchHistoryView, status]);

  const handleRemoveSearchHistory = async (
    search: string,
    all: boolean = false
  ) => {
    try {
      if (status === "authenticated" && session !== null) {
        const url = "/api/user/delete-history";

        const response = await fetch(url, {
          method: "DELETE",
          body: all
            ? JSON.stringify({
                user_email: session.user?.email,
                delete_all: true,
              })
            : JSON.stringify({
                user_email: session.user?.email,
                delete_all: false,
                specified_history: search,
              }),
        });

        setDeleteInProgress(false);
        if (response.status === 202) {
          setRefreshSearchHistoryView(true);
          alert("Delete success");
        } else if (response.status === 500) {
          alert("Error: Failed to Delete Specified Search History!");
        }
      }
    } catch (error) {
      console.log("Failed to remove search: ", error);
      alert("Error: Resolve your internet connection to continue");
    }
  };

  if (status === "authenticated") {
    return (
      <main className="relative">
        <div
          id="user-session-card"
          className=" fixed right-1 top-24 max-md:top-12 bg-black text-white  rounded-lg bg-gradient-to-br from-black via-orange-300 to-orange-400 p-3 flex flex-col gap-2 transition-all duration-700 ease-in-out"
        >
          <div className=" flex flex-row gap-3 items-center justify-center">
            {session.user?.image ? (
              <Image
                src={session.user?.image}
                alt=""
                width={1376}
                height={768}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-white" />
            )}
            <span
              className={clsx("text-sm text-white", {
                hidden: !isSessionCardOpen,
              })}
            >
              Hello, {session.user?.name?.split(" ")[0]}
            </span>
          </div>

          {showButtons && (
            <div className="w-full flex flex-col gap-1">
              <button
                type="button"
                onClick={() => {
                  signOut();
                }}
                className=" p-3 bg-white rounded-xl text-sm text-black flex flex-row items-center justify-center gap-2"
              >
                <LogOutIcon />
                <span>Sign Out</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setProfileOpen(true);
                }}
                className=" p-3 bg-white rounded-xl text-sm text-black flex flex-row items-center justify-center gap-2"
              >
                <User2Icon />
                <span>Profile</span>
              </button>
            </div>
          )}
        </div>

        {profileOpen && (
          <div className=" max-md:p-3 absolute inset-0 bg-black  flex items-center justify-center w-full h-screen bg-opacity-50">
            <section className=" bg-white md:w-3/4 h-[80vh] w-full flex flex-col p-4 pt-12 gap-1 relative">
              <button
                onClick={() => {
                  setProfileOpen(false);
                }}
                className=" w-10 h-10 rounded-full absolute right-3 top-1 font-semibold text-4xl hover:shadow hover:shadow-black transition-all duration-300 ease-linear flex items-center justify-center"
              >
                <span className="-mt-2">x</span>
              </button>
              <hr className=" w-full" />
              <div className="w-full md:h-full flex md:flex-row flex-col md:gap-4 gap-2 overflow-hidden overflow-y-auto max-md:mb-10">
                {/* profile infomation */}
                <div className=" overflow-hidden md:h-full h-[30vh] md:w-1/4 w-full bg-black md:rounded-lg rounded-md p-2 flex md:flex-col flex-row items-center max-md:gap-3">
                  <div className=" md:w-full flex md:flex-col items-center">
                    {session.user?.image ? (
                      <Image
                        src={session.user?.image}
                        alt=""
                        width={1400}
                        height={1000}
                        className=" md:w-48 md:h-48 w-16 h-16 rounded-full"
                      />
                    ) : (
                      <div className="md:w-48 md:h-48 w-16 h-16 rounded-full bg-white" />
                    )}
                  </div>

                  <div className=" mt-5 md:w-full flex flex-col md:gap-3">
                    <label htmlFor="session-username" className="flex flex-col">
                      <span className="text-xs text-gray-400">Name:</span>
                      <span
                        id="session-username"
                        className=" w-full max-md:-mt-2 text-md text-start text-white"
                      >
                        {session.user?.name}
                      </span>
                    </label>
                    <label htmlFor="session-email" className="flex flex-col">
                      <span className="text-xs text-gray-400">Email:</span>
                      <span
                        id="session-email"
                        className=" w-full max-md:-mt-2 text-sm text-start text-white"
                      >
                        {session.user?.email}
                      </span>
                    </label>
                  </div>
                </div>

                {/* search history */}
                <div className="grow md:border-4 border-t-4 border-t-orange-400 md:border-t-0 md:border-r-0 md:border-l-orange-300 md:border-b-orange-400 md:rounded-md md:rounded-t-none md:rounded-r-none px-2 overflow-hidden overflow-y-auto">
                  <div className="flex flex-row items-center justify-between sticky top-0 bg-white py-2">
                    <span className="text-black sm:text-2xl text-sm md:underline underline-offset-8">
                      Search History:
                    </span>
                    <button
                      type="button"
                      disabled={!searchHistory || searchHistory.length < 2}
                      onClick={() => {
                        setDeleteInProgress(true);
                        handleRemoveSearchHistory("", true);
                      }}
                      className={clsx(
                        " bg-red-500 text-white p-2 text-xs rounded-sm font-bold transition-colors duration-300 ease-linear",
                        {
                          " opacity-55 ":
                            !searchHistory || searchHistory.length < 2,
                          "hover:bg-red-400":
                            searchHistory && searchHistory.length >= 2,
                        }
                      )}
                    >
                      {deleteInProgress ? (
                        <div className=" w-3 h-3 border-2 border-white border-t-0 border-l-0 border-r-0 animate-spin duration-500 repeat-infinite rounded-full" />
                      ) : (
                        <span>Delete All</span>
                      )}
                    </button>
                  </div>
                  <Suspense fallback={<Loading />}>
                    <div className=" flex flex-col gap-2 p-1 px-2 mt-2">
                      {searchHistory !== null &&
                        searchHistory.map((search) => (
                          <div
                            key={search}
                            className=" bg-slate-300 md:text-xl p-1 py-3 rounded-md flex flex-row gap-2 items-center justify-between"
                          >
                            <SearchHistoryItem searchRelatedURL={search} />
                            <div className=" flex flex-row gap-2 items-center">
                              <Link
                                href={search}
                                target="_blank"
                                className=" text-white p-2 text-xs rounded-sm bg-orange-300 hover:bg-orange-400 "
                              >
                                View
                              </Link>
                              <button
                                type="button"
                                onClick={() => {
                                  setSearchUnderDelete(search);
                                  setDeleteInProgress(true);
                                  handleRemoveSearchHistory(search);
                                }}
                                className=" bg-red-500 hover:bg-red-400 text-white p-2 text-xs rounded-sm font-bold transition-colors duration-300 ease-linear"
                              >
                                {deleteInProgress &&
                                searchUnderDelete === search ? (
                                  <div className=" w-3 h-3 border-2 border-white border-t-0 border-l-0 border-r-0 animate-spin duration-500 repeat-infinite rounded-full" />
                                ) : (
                                  <span>Delete</span>
                                )}
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </Suspense>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    );
  }
};

export default UserProfileButton;
