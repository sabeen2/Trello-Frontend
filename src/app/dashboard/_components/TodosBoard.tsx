"use client";
import { initGetAllTasks } from "@/app/api/tasks/requests";
import AddNewButton from "../core-components/AddNewButton";
import Card from "./Card";
import SectionSkeleton from "./SectionSkeleton";
import { useGetAllTasks } from "@/app/api/tasks/queries";
import { TaskStatus } from "@/schema/task.schema";

const TodosBoard = () => {
  const { data: allTasks, isLoading: loadingTasks } = useGetAllTasks("sabeen");

  const getTasksByStatus = (status: any) => {
    return allTasks?.tasks?.filter((task: any) => task.status === status);
  };
  console.log(getTasksByStatus("TO-DO"));

  return (
    <div className="bg-white  h-[650px] w-auto border-[1px] border-gray-200 shadow-lg px-4 py-4 flex flex-wrap justify-between">
      <div className="flex flex-col items-center  justify-start gap-y-2">
        <SectionSkeleton
          sectionTitle="Todos"
          cardDatas={getTasksByStatus(TaskStatus.TODO)}
        />
        <AddNewButton />
      </div>
      <div className="flex flex-col items-center gap-y-2">
        <SectionSkeleton
          sectionTitle="Under Review"
          cardDatas={getTasksByStatus(TaskStatus.UNDER_REVIEW)}
        />
        <AddNewButton />
      </div>
      <div className="flex flex-col items-center gap-y-2">
        <SectionSkeleton
          sectionTitle="In Progress"
          cardDatas={getTasksByStatus(TaskStatus.IN_PROGRESS)}
        />
        <AddNewButton />
      </div>
      <div className="flex flex-col items-center gap-y-2">
        <SectionSkeleton
          sectionTitle="Done"
          cardDatas={getTasksByStatus(TaskStatus.DONE)}
        />
        <AddNewButton />
      </div>
    </div>
  );
};

export default TodosBoard;
