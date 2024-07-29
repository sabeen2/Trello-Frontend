import axios, { AxiosError, AxiosRequestConfig } from "axios";

import {
  APIRequestDetail,
  IApiDetails,
  RequestBodyType,
} from "@/schema/http.schema";
import { sanitizeController } from "./sanitize-controller";
import { transformRequestData } from "./transform-request-data";

export const makeHttpRequest = async (
  apiDetails: IApiDetails,
  apiRequestDetails: APIRequestDetail = {}
) => {
  const sanitizedRequestDetails = sanitizeController(
    apiDetails,
    apiRequestDetails.pathVariables
  );
  const { controllerName, requestMethod } = sanitizedRequestDetails;
  const transformedData = transformRequestData(
    apiDetails,
    apiRequestDetails.requestData
  );
  const baseApiEndpoint =
    process.env.BASE_API_ENDPOINT ||
    process.env.NEXT_PUBLIC_BASE_API_ENDPOINT ||
    "https://assingment-backend-kzba.onrender.com";
  let config: AxiosRequestConfig = {
    baseURL: baseApiEndpoint,
    url: `/${controllerName}`,
    method: requestMethod,
    responseType: "json",
    headers: {
      "Content-Type":
        apiDetails.requestBodyType === RequestBodyType.FORMDATA
          ? "multipart/form-data"
          : "application/json",
    },
    data: transformedData,
  };

  if (apiRequestDetails.params) {
    config = {
      ...config,
      params: apiRequestDetails.params,
    };
  }

  try {
    const res = await axios.request(config);
    return res.data;
  } catch (error) {
    let errorMsg = "";

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      errorMsg = error.response?.data?.message || axiosError.message;
    } else {
      errorMsg = "something went wrong";
    }

    console.log(errorMsg);
    throw new Error(errorMsg);
  }
};
