import Image from "next/image";
import React from "react";
import Card from "./Card";
import AddNewButton from "../core-components/AddNewButton";

const SectionSkeleton = ({ sectionTitle, cardDatas }: any) => {
  return (
    <div className="space-y-4  overflow-y-scroll h-[55vh] border-gray-200 px-2 rounded-lg border-b-[1px] border-l-[1px] items-center justify-center ">
      <div className="flex items-center w-[340px] justify-between px-2  ">
        <div className="font-[400] text-[20px]">{sectionTitle}</div>
        <Image
          src={"/images/columnbar.png"}
          alt={"arrow"}
          width={24}
          height={24}
          className={"w-[24px] h-[24px]"}
        />
      </div>

      {cardDatas?.map((cardData: any, index: number) => (
        <Card key={index} cardData={cardData} />
      ))}
      {/* <Card /> */}
    </div>
  );
};

export default SectionSkeleton;
