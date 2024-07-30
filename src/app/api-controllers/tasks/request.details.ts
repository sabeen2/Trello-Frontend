import { RequestAuthType, RequestMethod } from "@/schema/http.schema";

const prefix = "tasks";

const tasks = {
  getAllTasks: {
    controllerName: `${prefix}/getAll/{username}`,
    requestMethod: RequestMethod.GET,
    queryKeyName: "GET_ALL_TASKS",
    requestAuthType: RequestAuthType.AUTH,
  },

  deleteTask: {
    controllerName: `${prefix}/delete/{taskId}`,
    requestMethod: RequestMethod.GET,
    queryKeyName: "DELETE_TASK",
    requestAuthType: RequestAuthType.AUTH,
  },

  addTask: {
    controllerName: `${prefix}/add-task`,
    requestMethod: RequestMethod.POST,
    queryKeyName: "ADD_TASK",
    requestAuthType: RequestAuthType.AUTH,
  },

  updateTask: {
    controllerName: `${prefix}/update`,
    requestMethod: RequestMethod.POST,
    queryKeyName: "UPDATE_TASK",
    requestAuthType: RequestAuthType.AUTH,
  },
};

export default tasks;
