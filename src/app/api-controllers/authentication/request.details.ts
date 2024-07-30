import { RequestMethod } from "@/schema/http.schema";

const prefix = "user";

const authentication = {
  getSignup: {
    controllerName: `${prefix}/signup`,
    requestMethod: RequestMethod.POST,
    queryKeyName: "GET_SIGNUP",
  },

  getLogin: {
    controllerName: `${prefix}/login`,
    requestMethod: RequestMethod.POST,
    queryKeyName: "GET_LOGIN",
  },
};

export default authentication;
