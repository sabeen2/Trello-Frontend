import { useMutation, useQuery } from "@tanstack/react-query";
import authentication from "./request.details";
const { getAllTasks } = tasks;

import { makeHttpRequest } from "@/utils/http/make-http-request";
import { ISignupRequest } from "@/schema/signup.schema";
import { ILoginRequest } from "@/schema/login.schema";
import tasks from "./request.details";
import { initGetAllTasks } from "./requests";

// export const useLogin = () => {
//   return useMutation({
//     mutationFn: (requestData: ILoginRequest) => {
//       return makeHttpRequest(getLogin, {
//         requestData,
//       });
//     },
//   });
// };

// export const useSignup = () => {
//   return useMutation({
//     mutationFn: (requestData: ISignupRequest) => {
//       return makeHttpRequest(getSignup, {
//         requestData,
//       });
//     },
//   });
// };

export const useGetAllTasks = (username: string) => {
  return useQuery({
    queryKey: [getAllTasks.queryKeyName, username],
    queryFn: () => initGetAllTasks(username),
  });
};
