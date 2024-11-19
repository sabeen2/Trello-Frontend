"use client";
import { useAuth } from "@/providers/AuthContext";
import React, { useEffect, useState } from "react";
import { Form, Input, message, Spin } from "antd";
import { useLogin } from "@/app/api-controllers/authentication/queries";
import { ILoginRequest } from "@/schema/login.schema";
import Link from "next/link";
import path from "../../../utils/paths.utils";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [loginForm] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);

  const { mutate: sendLoginRequest, isPending: isLoginPending } = useLogin();

  const defaultCredentials = {
    email: "sabeen@yopmail.com",
    password: "123456",
  };

  const onFinish = (values: ILoginRequest) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    sendLoginRequest(payload, {
      onSuccess: (data) => {
        message.success("You have successfully logged in");
        login(data.token);
      },
      onError: (err) => {
        message.error(`Failed ${err.message}`);
      },
    });
  };

  useEffect(() => {
    // Autofill credentials on form load
    loginForm.setFieldsValue(defaultCredentials);
    checkFormValidity();
  }, []);

  const checkFormValidity = () => {
    const isValid =
      loginForm.isFieldsTouched(true) &&
      !loginForm.getFieldsError().some(({ errors }) => errors.length);
    setIsFormValid(isValid);
  };

  const autofillCredentials = () => {
    loginForm.setFieldsValue(defaultCredentials);
    checkFormValidity();
  };

  return (
    <div className="h-screen bg-gradient-to-b from-white to-[#AFA3FF] flex justify-center items-center">
      <div className="bg-white w-[648px] h-[540px] flex flex-col items-center justify-start">
        <div className="text-[#2D2D2D] font-[600] text-[48px] mt-[40px] text-center">
          Welcome to <span className="text-[#4534AC]">Workflo</span>!
        </div>
        <button
          className="mt-6 mb-4 bg-gradient-to-r from-[#FF9800] to-[#FF5722] text-white font-bold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          onClick={autofillCredentials}
        >
          Autofill Credentials
        </button>
        <div className="h-[210px] w-[528px] flex items-center justify-center">
          <Form
            form={loginForm}
            name="loginForm"
            onFinish={onFinish}
            onFieldsChange={checkFormValidity}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "The input is not a valid email!" },
              ]}
            >
              <Input
                placeholder="Your email"
                className="w-[528px] h-[56px] placeholder-[#999999] placeholder-opacity-60 font-[400] text-base text-left bg-[#EBEBEB] rounded-[8px] text-[#606060] text-[20px]"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                className="w-[528px] h-[56px] placeholder-[#999999] placeholder-opacity-60 font-[400] text-base text-left bg-[#EBEBEB] rounded-[8px] text-[#606060] text-[20px]"
              />
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                className={`text-white w-[528px] h-[52px] flex justify-center items-center shadow-custom rounded-lg border ${
                  isFormValid ? "opacity-100" : "opacity-80"
                } bg-gradient-to-b from-[#4C38C2] to-[#2F2188] text-[20px] font-[400]`}
                disabled={isLoginPending}
              >
                {isLoginPending ? <Spin /> : "Login"}
              </button>
            </Form.Item>
          </Form>
        </div>
        <div className="text-[#606060] font-[400] text-[20px] mt-[24.2px] text-center">
          Don’t have an account? Create a{" "}
          <Link href={path.signupPath()}>
            <span className="text-[#0054A1]">new account.</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
