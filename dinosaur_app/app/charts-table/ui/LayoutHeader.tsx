import Link from "next/link";
import React from "react";

const LayoutHeader = () => {
  return (
    <nav className="py-2 bg-slate-100 w-full flex flex-row items-center justify-center gap-10">
      <Link
        href={"/charts-table/data-charts"}
        className=" px-3 p-2 bg-orange-300 hover:bg-orange-400 text-white rounded-md font-light"
      >
        Charts
      </Link>
      <Link
        href={"/charts-table/data-table"}
        className=" px-3 p-2 bg-orange-300 hover:bg-orange-400 text-white rounded-md font-light"
      >
        Tables
      </Link>
    </nav>
  );
};

export default LayoutHeader;
