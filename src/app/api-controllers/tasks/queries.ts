import { useMutation, useQuery } from "@tanstack/react-query";
import authentication from "./request.details";
const { getAllTasks, addTask, deleteTask, updateTask } = tasks;

import { makeHttpRequest } from "@/utils/http/make-http-request";

import { ILoginRequest } from "@/schema/login.schema";
import tasks from "./request.details";
import { initGetAllTasks } from "./requests";
import { ITaskInterface } from "@/schema/task.schema";

export const useAddTask = () => {
  return useMutation({
    mutationFn: (requestData: ITaskInterface) => {
      return makeHttpRequest(addTask, {
        requestData,
      });
    },
  });
};

export const useUpdateTask = () => {
  return useMutation({
    mutationFn: (requestData: ITaskInterface) => {
      return makeHttpRequest(updateTask, {
        requestData,
      });
    },
  });
};
export const useGetAllTasks = (username: string) => {
  return useQuery({
    queryKey: [getAllTasks.queryKeyName, username],
    queryFn: () => initGetAllTasks(username),
  });
};

export const useGetDeleteTask = (taskId: number) => {
  return useQuery({
    queryKey: [deleteTask.queryKeyName, taskId],
    queryFn: () =>
      makeHttpRequest(deleteTask, {
        params: {
          taskId: taskId,
        },
      }),
  });
};
