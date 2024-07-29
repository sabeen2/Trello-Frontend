"use client";
import Image from "next/image";

interface IButtonProps {
  buttonText?: string;
  buttonSize?: string;
}

const CreateTaskButton = ({ buttonText, buttonSize }: IButtonProps) => {
  return (
    <div>
      <button
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
    </div>
  );
};

export default CreateTaskButton;
