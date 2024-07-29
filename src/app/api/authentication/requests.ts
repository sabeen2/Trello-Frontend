import { makeHttpRequest } from "@/utils/http/make-http-request";

import authentication from "./request.details";
import { ISignupRequest } from "@/schema/signup.schema";
import { ILoginRequest } from "@/schema/login.schema";

const { getSignup, getLogin } = authentication;

export const initGetSignup = (requestData: ISignupRequest): Promise<any> => {
  return makeHttpRequest(getSignup, {
    requestData,
  });
};

export const initGetLogin = (requestData: ILoginRequest): Promise<any> => {
  return makeHttpRequest(getLogin, {
    requestData,
  });
};
