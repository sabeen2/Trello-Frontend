import { makeHttpRequest } from "@/utils/http/make-http-request";

import tasks from "./request.details";

const { getAllTasks, deleteTask } = tasks;

export const initGetAllTasks = (username: string): Promise<any> => {
  return makeHttpRequest(getAllTasks, {
    pathVariables: {
      username,
    },
  });
};

// export const initGetLogin = (requestData: any): Promise<any> => {
//   return makeHttpRequest(getLogin, {
//     requestData,
//   });
// };

export const initDeleteTask = (taskId: string): Promise<any> => {
  return makeHttpRequest(deleteTask, {
    pathVariables: {
      taskId,
    },
  });
};
