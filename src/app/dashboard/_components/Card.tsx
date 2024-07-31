import { initDeleteTask } from "@/app/api-controllers/tasks/requests";
import { useAuth } from "@/providers/AuthContext";
import { ITaskInterface } from "@/schema/task.schema";
import { getTimeDifference } from "@/utils/time.utils";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useDrag } from "react-dnd";

interface CardProps {
  cardData: ITaskInterface;
}

const Card = ({ cardData }: CardProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { id: cardData._id, status: cardData.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const { success, setSuccess, open, setOpen, createForm, setSelectedUserId } =
    useAuth();

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
  const deleteTask = (taskId: string) => {
    initDeleteTask(taskId);
    setSuccess(!success);
  };

  return (
    <div
      ref={drag as unknown as React.LegacyRef<HTMLDivElement>}
      className={`bg-slate-50 w-[340px] px-3 py-3 border border-[#DEDEDE] rounded-lg shadow-lg transition-transform duration-200 ${
        isDragging ? "opacity-70 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <div className="space-y-2 mb-2">
        <div className="text-lg font-semibold text-gray-900 ">
          {cardData.title}
        </div>
        <div className="text-base font-normal text-gray-700">
          {cardData.description}
        </div>
      </div>
      {cardData.priority && (
        <div
          className={`text-xs font-semibold text-white px-3 py-1 rounded-md inline-flex ${
            cardData.priority === "Low"
              ? "bg-green-500"
              : cardData.priority === "Medium"
              ? "bg-orange-500"
              : "bg-red-500"
          }`}
        >
          {cardData.priority}
        </div>
      )}

      {cardData.deadline !== "Invalid Date" && (
        <div className="flex items-center gap-x-2 mt-2">
          <Image
            src={"/images/clock.png"}
            alt="clock"
            width={24}
            height={24}
            className="w-4 h-4"
          />
          <div className="text-sm font-medium text-gray-600">
            {cardData.deadline}
          </div>
        </div>
      )}

      <div className="text-sm font-medium text-gray-500 flex justify-between items-center mt-3">
        <span>{getTimeDifference(cardData.createdAt)}</span>
        <div className="flex space-x-4">
          <button
            onClick={() => updateTask(cardData)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <EditOutlined className="text-gray-700 text-xl" />
          </button>
          <button
            onClick={() => deleteTask(cardData._id)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <DeleteOutlined className="text-red-600 text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
