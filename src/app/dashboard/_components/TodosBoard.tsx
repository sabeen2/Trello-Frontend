"use client";
import { useAuth } from "@/providers/AuthContext";
import AddNewButton from "../core-components/AddNewButton";
import SectionSkeleton from "./SectionSkeleton";
import {
  useGetAllTasks,
  useUpdateTask,
} from "@/app/api-controllers/tasks/queries";
import { ITaskInterface, TaskStatus } from "@/schema/task.schema";
import { useEffect, useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Spin } from "antd";

const TodosBoard = () => {
  const { username, success, setSuccess, open, setOpen, createForm } =
    useAuth();

  const {
    data: allTasks,
    isLoading: loadingTasks,
    refetch: refetchTasks,
  } = useGetAllTasks(username);

  const [taskList, setTaskList] = useState<ITaskInterface[]>([]);

  useEffect(() => {
    refetchTasks();
  }, [success]);

  useEffect(() => {
    if (allTasks?.tasks) {
      setTaskList(allTasks.tasks);
    }
  }, [allTasks]);

  const getTasksByStatus = useCallback(
    (status: TaskStatus) => {
      return taskList?.filter((task) => task.status === status);
    },
    [taskList]
  );

  const { mutate: updateTask } = useUpdateTask();

  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
    updateTask(
      { taskId, status: newStatus },
      {
        onSuccess: () => {
          setSuccess(!success);
        },
      }
    );
  };

  return (
    <div>
      {!loadingTasks ? (
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
                  onDrop={updateTaskStatus}
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
      ) : (
        <div className="flex items-center justify-center">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default TodosBoard;
