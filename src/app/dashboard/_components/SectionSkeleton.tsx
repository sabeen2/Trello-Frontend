import Image from "next/image";
import React from "react";
import Card from "./Card";
import AddNewButton from "../core-components/AddNewButton";

const SectionSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center w-[380px] justify-between px-2 ">
        <div className="font-[400] text-[20px]">Todo</div>
        <Image
          src={"/images/columnbar.png"}
          alt={"arrow"}
          width={24}
          height={24}
          className={"w-[24px] h-[24px]"}
        />
      </div>
      <Card />
      <AddNewButton />
    </div>
  );
};

export default SectionSkeleton;
