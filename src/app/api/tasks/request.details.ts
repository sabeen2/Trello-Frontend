import { RequestAuthType, RequestMethod } from "@/schema/http.schema";

const prefix = "tasks";

const tasks = {
  getAllTasks: {
    controllerName: `${prefix}/getAll/{username}`,
    requestMethod: RequestMethod.GET,
    queryKeyName: "GET_ALL_TASKS",
    requestAuthType: RequestAuthType.AUTH,
  },

  // deleteTask: {
  //   controllerName: `${prefix}/delete/{taskId}`,
  //   requestMethod: RequestMethod.GET,
  //   queryKeyName: "DELETE_TASK",
  // },

  // updateTask: {
  //   controllerName: `${prefix}/update`,
  //   requestMethod: RequestMethod.POST,
  //   queryKeyName: "GET_ALL_TASKS",
  // },
};

export default tasks;
