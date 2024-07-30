"use client";
import { useAuth } from "@/providers/AuthContext";
import AddNewButton from "../core-components/AddNewButton";
import Card from "./Card";
import SectionSkeleton from "./SectionSkeleton";
import { useGetAllTasks } from "@/app/api-controllers/tasks/queries";
import { TaskStatus } from "@/schema/task.schema";
import { useEffect } from "react";

const TodosBoard = () => {
  const { username, success, open, setOpen, createForm } = useAuth();

  const {
    data: allTasks,
    isLoading: loadingTasks,
    refetch: refetchTasks,
  } = useGetAllTasks(username);

  useEffect(() => {
    refetchTasks();
  }, [success]);

  const getTasksByStatus = (status: any) => {
    return allTasks?.tasks?.filter((task: any) => task.status === status);
  };

  return (
    <div className="bg-white  h-[650px] w-auto border-[1px] border-gray-200 shadow-lg px-4 py-4 flex flex-wrap justify-between">
      <div className="flex flex-col items-center  justify-start gap-y-2">
        <SectionSkeleton
          sectionTitle="Todos"
          cardDatas={getTasksByStatus(TaskStatus.TODO)}
        />
        <AddNewButton
          onButtonClick={() => {
            setOpen(true);
            createForm.setFieldsValue({ status: TaskStatus.TODO });
          }}
        />
      </div>
      <div className="flex flex-col items-center gap-y-2">
        <SectionSkeleton
          sectionTitle="Under Review"
          cardDatas={getTasksByStatus(TaskStatus.UNDER_REVIEW)}
        />
        <AddNewButton
          onButtonClick={() => {
            setOpen(true);
            createForm.setFieldsValue({ status: TaskStatus.UNDER_REVIEW });
          }}
        />
      </div>
      <div className="flex flex-col items-center gap-y-2">
        <SectionSkeleton
          sectionTitle="In Progress"
          cardDatas={getTasksByStatus(TaskStatus.IN_PROGRESS)}
        />
        <AddNewButton
          onButtonClick={() => {
            setOpen(true);
            createForm.setFieldsValue({ status: TaskStatus.IN_PROGRESS });
          }}
        />
      </div>
      <div className="flex flex-col items-center gap-y-2">
        <SectionSkeleton
          sectionTitle="Done"
          cardDatas={getTasksByStatus(TaskStatus.DONE)}
        />
        <AddNewButton
          onButtonClick={() => {
            setOpen(true);
            createForm.setFieldsValue({ status: TaskStatus.DONE });
          }}
        />
      </div>
    </div>
  );
};

export default TodosBoard;
