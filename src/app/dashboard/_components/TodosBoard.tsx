"use client";
import { useAuth } from "@/providers/AuthContext";
import AddNewButton from "../core-components/AddNewButton";
import SectionSkeleton from "./SectionSkeleton";
import { useGetAllTasks } from "@/app/api-controllers/tasks/queries";
import { TaskStatus } from "@/schema/task.schema";
import { useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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

  const getTasksByStatus = useCallback(
    (status: any) => {
      return allTasks?.tasks?.filter((task: any) => task.status === status);
    },
    [allTasks]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-white h-[650px] w-auto border-[1px] border-gray-200 shadow-lg px-4 py-4 flex flex-wrap justify-between">
        {Object.values(TaskStatus).map((status) => (
          <div
            key={status}
            className="flex flex-col items-center justify-start gap-y-2"
          >
            <SectionSkeleton
              sectionTitle={status.replace("_", " ")}
              cardDatas={getTasksByStatus(status)}
              status={status}
            />
            <AddNewButton
              onButtonClick={() => {
                setOpen(true);
                createForm.setFieldsValue({ status });
              }}
            />
          </div>
        ))}
      </div>
    </DndProvider>
  );
};

export default TodosBoard;
