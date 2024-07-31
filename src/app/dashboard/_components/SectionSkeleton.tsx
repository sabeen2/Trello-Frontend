import Image from "next/image";
import React from "react";
import { useDrop } from "react-dnd";
import Card from "./Card";
import { TaskStatus } from "@/schema/task.schema";
import { useAuth } from "@/providers/AuthContext";

interface SectionSkeletonProps {
  sectionTitle: string;
  cardDatas: any[];
  status: TaskStatus;
  onDrop: (taskId: string, newStatus: TaskStatus) => void;
}

const SectionSkeleton = ({
  sectionTitle,
  cardDatas,
  status,
  onDrop,
}: SectionSkeletonProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    drop: (item: any) => {
      if (item.status !== status) {
        onDrop(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop as unknown as React.LegacyRef<HTMLDivElement>}
      className={`space-y-5 overflow-y-scroll max-h-[58vh] border-gray-200 px-2 rounded-lg border-b-[1px] border-l-[1px] items-center justify-center min-h-32 ${
        isOver ? "bg-gray-100" : "bg-white"
      }`}
    >
      <div className="flex items-center w-[340px] justify-between px-2">
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
        <Card key={cardData._id} cardData={cardData} />
      ))}
    </div>
  );
};

export default SectionSkeleton;
