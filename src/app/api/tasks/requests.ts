import { makeHttpRequest } from "@/utils/http/make-http-request";

import tasks from "./request.details";

const { getAllTasks } = tasks;

// export const initGetAllTasks = (username: string): Promise<any> => {
//   return makeHttpRequest(getAllTasks, {
//     params: {
//       username: username,
//     },
//   });
// };

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
