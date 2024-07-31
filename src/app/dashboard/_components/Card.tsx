import { useUpdateTask } from "@/app/api-controllers/tasks/queries";
import { initDeleteTask } from "@/app/api-controllers/tasks/requests";
import { useAuth } from "@/providers/AuthContext";
import { ITaskInterface } from "@/schema/task.schema";
import { getTimeDifference } from "@/utils/time.utils";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";

interface CardProps {
  cardData: ITaskInterface;
}

const Card = ({ cardData }: CardProps) => {
  const {
    success,
    setSuccess,
    username,
    open,
    setOpen,
    createForm,
    setSelectedUserId,
    selectedUserId,
  } = useAuth();

  const { mutate: updateTaskOn } = useUpdateTask();

  const deleteTask = (taskId: string) => {
    initDeleteTask(taskId);
    setSuccess(!success);
  };

  const updateTask = (cardData: ITaskInterface) => {
    let payload = {
      title: cardData.title,
      description: cardData.description,
      status: cardData.status,
      priority: cardData.priority,
    };
    setSelectedUserId(cardData._id);
    setOpen(true);
    createForm.setFieldsValue(payload);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { id: cardData._id, status: cardData.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as any}
      className={`bg-[#F9F9F9] w-[340px] px-4 py-4 border-[1px] border-[#DEDEDE] space-y-3 rounded-lg shadow-md ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="space-y-4">
        <div className="text-[16px] font-[500] text-gray-800">
          {cardData.title}
        </div>
        <div className="text-[14px] font-[400] text-gray-600">
          {cardData.description}
        </div>
      </div>
      <div
        className={`text-[12px] font-[400] text-white px-2 py-1 w-[55px] h-[27px] rounded-md ${
          cardData.priority === "Low"
            ? "bg-[#0ECC5A]"
            : cardData.priority === "Medium"
            ? "bg-[#FFA235]"
            : "bg-[#FF6B6B]"
        }`}
      >
        {cardData.priority}
      </div>

      {cardData.deadline !== "Invalid Date" && (
        <div className="flex items-center gap-x-2">
          <Image
            src={"/images/clock.png"}
            alt="clock"
            width={24}
            height={24}
            className="w-[24px] h-[24px]"
          />
          <div>
            <span className="text-[14px] font-[600] text-[#606060]">
              {cardData.deadline}
            </span>
          </div>
        </div>
      )}

      <div className="text-[14px] font-[500] text-[#797979] flex gap-x-[150px]">
        {getTimeDifference(cardData.createdAt)}
        <div className="flex space-x-6">
          <button onClick={() => updateTask(cardData)}>
            <EditOutlined className="text-black text-lg" />
          </button>
          <button onClick={() => deleteTask(cardData._id)}>
            <DeleteOutlined className="text-red-600 text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
