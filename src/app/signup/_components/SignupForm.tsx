"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, message, Spin } from "antd";
import { useSignup } from "@/app/api-controllers/authentication/queries";
import { ISignupRequest } from "@/schema/signup.schema";
import Link from "next/link";
import path from "../../../utils/paths.utils";
import { useRouter } from "next/navigation";

const SignupForm: React.FC = () => {
  const [signupForm] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);

  const { mutate: sendSignupRequest, isPending: isSignupPending } = useSignup();
  const router = useRouter();

  const onFinish = (values: ISignupRequest) => {
    let payload = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    sendSignupRequest(payload, {
      onSuccess: () => {
        message.success("You have successfully signed up");
        signupForm.resetFields();
        router.push(path.loginPath());
      },
      onError: (err) => {
        message.error(`Failed  ${err?.message}`);
      },
    });
  };

  useEffect(() => {
    checkFormValidity();
  }, []);

  const checkFormValidity = () => {
    const isValid =
      signupForm.isFieldsTouched(true) &&
      !signupForm.getFieldsError().some(({ errors }) => errors.length);
    setIsFormValid(isValid);
  };

  return (
    <div className="h-screen bg-gradient-to-b from-white to-[#AFA3FF] flex justify-center items-center">
      <div className="bg-white w-[648px] h-[556px] flex justify-center">
        <div className="text-[#2D2D2D] font-[600] text-[48px] mt-[57.6px] text-center">
          Welcome to <span className="text-[#4534AC] ">Workflo</span>!
          <div className="h-[260px] w-[528px] flex items-center justify-center mt-[42px] ">
            <Form
              form={signupForm}
              name="signupForm"
              onFinish={onFinish}
              onFieldsChange={checkFormValidity}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input
                  placeholder="Your Full Name"
                  className="w-[528px] h-[56px] placeholder-[#999999] placeholder-opacity-60 font-[400] text-base text-left bg-[#EBEBEB] rounded-[8px] text-[#606060] text-[20px]"
                />
              </Form.Item>

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
                  disabled={isSignupPending}
                >
                  {isSignupPending ? <Spin /> : "Signup"}
                </button>
              </Form.Item>
            </Form>
          </div>
          <div className="text-[#606060] font-[400] text-[20px] mt-[24.2px] text-center">
            Already have an account?{" "}
            <Link href={path.loginPath()}>
              <span className="text-[#0054A1]">Log in.</span>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
