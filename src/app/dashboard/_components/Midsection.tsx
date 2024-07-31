"use client";
import Image from "next/image";
import React from "react";
import CreateTaskButton from "../core-components/CreateTaskButton";
import { useAuth } from "@/providers/AuthContext";

const midItems = [
  {
    title: "Calendar view",
    icon: "/images/calender.png",
  },
  {
    title: "Automation",
    icon: "/images/automation.png",
  },
  {
    title: "Filter",
    icon: "/images/filter.png",
  },
  {
    title: "Share",
    icon: "/images/share.png",
  },
];

const Midsection = () => {
  const { setSearchParams } = useAuth();
  return (
    <div>
      <div className="py-4 flex w-[1570px] justify-between ">
        {/* search */}
        <div className="flex items-center ">
          <input
            type="search"
            onChange={(e) => setSearchParams(e.target.value)}
            placeholder="Search"
            className="px-2 py-1 border-[1px] border-gray-200 shadow-sm rounded-md"
          />
          <Image
            src={"/images/search.png"}
            alt="search"
            width={24}
            height={24}
            className="w-[24px] h-[24px] -ml-8 text-gray-800"
          />
        </div>

        {/* miditems */}

        <div className="flex gap-x-12">
          <div className="flex items-center gap-x-6">
            {midItems.map((item, index) => (
              <div className="flex  flex-row items-center gap-x-2 " key={index}>
                <div className="text-[16px] font-[400] text-[#797979]">
                  {" "}
                  {item.title}
                </div>
                <Image
                  src={item.icon}
                  alt="search"
                  width={24}
                  height={24}
                  className="w-[24px] h-[24px] "
                />
              </div>
            ))}
          </div>

          <CreateTaskButton
            buttonText="Create Task"
            buttonSize="h-[40px] w-[136px] text-[16px] font-[500] gap-x-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Midsection;
