"use client";
import Image from "next/image";
import { Drawer } from "antd";
import { useState } from "react";
import CreateForm from "../_components/CreateForm";
import { useAuth } from "@/providers/AuthContext";

interface IButtonProps {
  buttonText?: string;
  buttonSize?: string;
  onButtonClick?: () => void;
}

const CreateTaskButton = ({ buttonText, buttonSize }: IButtonProps) => {
  const { open, setOpen, createForm } = useAuth();

  const showDrawer = () => {
    createForm.resetFields();
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={showDrawer}
        className={`text-white flex justify-center items-center shadow-custom rounded-lg border  bg-gradient-to-b from-[#4C38C2] to-[#2F2188]  ${
          buttonSize || "h-[52px] w-[253px] text-[20px] font-[500] gap-x-4"
        }`}
      >
        <span className="">{buttonText}</span>
        <Image
          src={"/images/plus.png"}
          alt="plus"
          height={21}
          width={21}
          className="h-[21px] w-[21px]"
        />
      </button>

      <Drawer
        size="large"
        onClose={onClose}
        open={open}
        title={
          <div className="flex justify-between items-center ">
            <Image
              src={"/images/expand.png"}
              alt="share"
              height={21}
              width={21}
              className="h-[14px] w-[14px] ml-4"
            />
            <div className="flex gap-x-4">
              <div className=" flex items-center bg-gray-100 gap-x-1 w-[82px] h-[40px] px-2 py-1 rounded-md">
                <span className="font-[400] text-[16px]"> Share </span>
                <Image
                  src={"/images/share.png"}
                  alt="share"
                  height={21}
                  width={21}
                  className="h-[21px] w-[21px]"
                />
              </div>
              <div className=" flex items-center bg-gray-100 gap-x-1 px-2 py-1 rounded-md">
                <span className="font-[400] text-[16px]"> Favourites </span>
                <Image
                  src={"/images/star.png"}
                  alt="share"
                  height={21}
                  width={21}
                  className="h-[21px] w-[21px]"
                />
              </div>
            </div>
          </div>
        }
      >
        <CreateForm />
      </Drawer>
    </div>
  );
};

export default CreateTaskButton;
